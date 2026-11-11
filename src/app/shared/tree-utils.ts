import {TreeNode} from "primeng/api";
import {DHelp} from "../dto/dictionary/DHelp";

type DNode = TreeNode & { data: DHelp | { synthetic: true; parId: null } };

export function buildTree(
    itemsIn: DHelp[],
    lang: string,
    opts: {
        expandAll?: boolean;
        disableParentSelection?: boolean;
        sort?: boolean;
        groupOrphans?: boolean;
    } = {}
): TreeNode[] {
    const {
        expandAll = true,
        disableParentSelection = true,
        sort = true,
        groupOrphans = true
    } = opts;

    const items = itemsIn.map(i => ({...i, parId: i.parId ?? null}));
    const collator = new Intl.Collator(lang === 'ru' ? 'ru' : 'kk', {sensitivity: 'base', numeric: true});

    const labelOf = (it: DHelp) =>
        String((lang === 'ru' ? it.rname : it.kname) ?? it.rname ?? it.kname ?? it.code ?? it.id)
            .replace(/\s+/g, ' ')
            .trim();

    const groupLabel = (pid: number, sample?: DHelp) => {
        const fromMeasure = lang === 'ru' ? sample?.measureId?.nameRu : sample?.measureId?.nameKz;
        return (fromMeasure?.trim() || `Категория ${pid}`);
    };

    const byKey = new Map<string, DNode>();
    const ensureNode = (key: string, label: string, data: any, leaf = true): DNode => {
        let n = byKey.get(key) as DNode | undefined;
        if (!n) {
            n = {
                key,
                label,
                data,
                children: [],
                leaf,
                selectable: leaf ? true : !disableParentSelection
            };
            byKey.set(key, n);
        }
        return n;
    };

    for (const it of items) {
        ensureNode(String(it.id), labelOf(it), it, true);
    }

    // 2) линкуем детей с родителями
    const roots = new Set<DNode>();

    for (const it of items) {
        const node = byKey.get(String(it.id))!;
        if (it.parId === null || it.parId === it.id) {
            roots.add(node);
            continue;
        }

        let parent = byKey.get(String(it.parId));
        if (!parent && groupOrphans) {
            parent = ensureNode(
                `grp-${it.parId}`,
                groupLabel(it.parId, it),
                {synthetic: true, parId: null},
                false
            );
            roots.add(parent);
        }

        if (parent) {
            parent.children!.push(node);
            parent.leaf = false;
            if (disableParentSelection) parent.selectable = false;
            roots.delete(node);
        } else {
            // без группировки — становится корнем
            roots.add(node);
        }
    }

    // 3) сортировка
    const sortNodes = (arr: DNode[]) => {
        arr.sort((a, b) => collator.compare(a.label ?? '', b.label ?? ''));
        for (const n of arr) if (n.children?.length) sortNodes(n.children as DNode[]);
    };
    const out = Array.from(roots);
    if (sort) sortNodes(out as DNode[]);

    // 4) раскрыть всё
    if (expandAll) {
        const expand = (n: DNode) => {
            if (n.children?.length) {
                n.expanded = true;
                n.children.forEach(c => expand(c as DNode));
            }
        };
        out.forEach(n => expand(n as DNode));
    }

    return out;
}

