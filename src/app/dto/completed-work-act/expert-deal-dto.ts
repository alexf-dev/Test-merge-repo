export interface ExpertDealDto {
    expertFullName?: string | null;
    numberOfForm031?: string | number | null;

    modifyDate?: string | null;
    deadlineEndDate?: string | null;
    combModifyDate?: string | null;

    disabilityGroupExp?: string | number | null;
    disabilityGroupRes?: string | number | null;
    disabilityGroupApp?: string | number | null;

    dealCount?: number | null;
    isNotExpired?: string | number | boolean | null;
    isSameGroup?: string | number | boolean | null;

    uotFirst?: number | null;
    uotFirstExp?: number | null;
    uotFirstApp?: number | null;

    uotRepeat?: number | null;
    uotRepeatExp?: number | null;
    uotRepeatApp?: number | null;

    ipr?: number | null;
    iprExp?: number | null;
    iprApp?: number | null;

    calcExp?: number | null;
}
