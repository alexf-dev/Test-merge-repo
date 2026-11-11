import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TabsComponent} from "./tabs/tabs.component";
import {CommonModule, NgClass} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Step3Component} from "./step3/step3.component";
import {Step3additionalDocumentsComponent} from "./step3additional-documents/step3additional-documents.component";
import {RegDataComponent} from "./reg-data/reg-data.component";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {InputNumberModule} from "primeng/inputnumber";
import {AccordionModule} from "primeng/accordion";
import {SocialDataComponent} from "./social-data/social-data.component";
import {ExaminationDataComponent} from "./examination-data/examination-data.component";
import {TranslateModule} from "@ngx-translate/core";
import {TranslateDictionaryPipe} from "../../core/pipe/translateDictionary.pipe";
import {AddGuardianComponent} from "./add-guardian/add-guardian.component";
import {FormationIprComponent} from "./formation-ipr/formation-ipr.component";
import {TableModule} from "primeng/table";
import {InputMaskModule} from "primeng/inputmask";
import {ChooseHelpComponent} from "./formation-ipr/choose-help/choose-help.component";
import {DialogModule} from "primeng/dialog";
import {TreeModule} from "primeng/tree";
import {CardModule} from "primeng/card";
import {DateFormatPipe} from "../../core/pipe/dateFormat.pipe";
import {PanelModule} from "primeng/panel";
import {ExpertConclusionComponent} from "./expert-conclusion/expert-conclusion.component";
import {DocumentsComponent} from "./documents/documents.component";
import {AdditionalDocumentsComponent} from "./documents/additional-documents/additional-documents.component";
import {IdentityCardComponent} from "./documents/identity-card/identity-card.component";
import {AbsenteeHistoryComponent} from "./absentee-history/absentee-history.component";
import {ConcatSubItemsNamePipe} from "../../core/pipe/concat-sub-items-name.pipe";

const routes: Routes = [
  { path: '', component: TabsComponent }
];
@NgModule({
  declarations: [
    TabsComponent,
    Step3Component,
    Step3additionalDocumentsComponent,
    RegDataComponent,
    SocialDataComponent,
    ExaminationDataComponent,
    AddGuardianComponent,
    FormationIprComponent,
    ChooseHelpComponent,
    AbsenteeHistoryComponent
  ],
  imports: [RouterModule.forChild(routes), NgClass, CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, CalendarModule, CheckboxModule, InputNumberModule, AccordionModule, TranslateModule, TranslateDictionaryPipe, CardModule, InputMaskModule, DialogModule, TreeModule, TableModule, DateFormatPipe, PanelModule, ExpertConclusionComponent, ReactiveFormsModule, DocumentsComponent, AdditionalDocumentsComponent, IdentityCardComponent, ConcatSubItemsNamePipe],
  exports: [RouterModule]
})
export class ExaminationModule {}
