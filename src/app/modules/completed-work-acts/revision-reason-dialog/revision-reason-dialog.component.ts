import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CompletedWorkActsService} from "../../../core/service/completed-work-acts.service";
import {finalize} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-revision-reason-dialog',
    templateUrl: './revision-reason-dialog.component.html',
    styleUrl: './revision-reason-dialog.component.css'
})
export class RevisionReasonDialogComponent {
    @Input() visible = false;
    @Input() actId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() saved = new EventEmitter<{
        actId: number;
        revisionReason: string;
    }>();

    revisionReason = '';
    saving = false;
    errorMessage = '';

    constructor(
        private completedWorkActsService: CompletedWorkActsService,
        private messageService: MessageService
    ) {
    }

    save(): void {
        const actId = this.actId;
        const revisionReason = this.revisionReason.trim();

        if (actId == null || !revisionReason || this.saving) {
            return;
        }

        this.saving = true;
        this.errorMessage = '';

        this.completedWorkActsService
            .saveRevisionReason({actId, revisionReason})
            .pipe(finalize(() => this.saving = false))
            .subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Успешно',
                        detail: 'Причина доработки успешно сохранена.'
                    });

                    this.close();
                    this.saved.emit({actId, revisionReason});
                },
                error: () => {
                    this.errorMessage =
                        'Не удалось сохранить причину доработки. Попробуйте ещё раз.';
                }
            });
    }

    close(): void {
        this.visible = false;
        this.visibleChange.emit(false);
        this.reset();
    }

    onHide(): void {
        this.close();
    }

    private reset(): void {
        this.revisionReason = '';
        this.errorMessage = '';
    }
}
