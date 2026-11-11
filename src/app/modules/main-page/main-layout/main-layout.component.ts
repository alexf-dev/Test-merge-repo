import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import {NavigationEnd, Router} from "@angular/router";
import {TranslationService} from "../../../core/service/translation.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  sidebarExpanded = true;
  open = {
    mc: false,
    omk: false,
    exam: false
  };
  currentBreadcrumb: string = '';
  langItems = [
    {code: 'kk', name: 'Қазақша'},
    {code: 'ru', name: 'Русский'}
  ]
  selectedLang = this.langItems.find(item => item.code === this.translationService.getSelectedLanguage());

  constructor(private router: Router, private translationService: TranslationService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        if (url.includes('expert-examination')) {
          this.currentBreadcrumb = 'Экспертное обследование';
        } else if (url.includes('patients/history')) {
          this.currentBreadcrumb = 'История пациента';
        } else if (url.includes('patients')) {
          this.currentBreadcrumb = 'Пациенты';
        }else if (url.includes('kpu')) {
          this.currentBreadcrumb = 'Карточка пациента';
        }else if (url.includes('examination')){
          this.currentBreadcrumb = 'Заочное освидетельствование';
        }
        else {
          this.currentBreadcrumb = '';
        }
      });
  }
  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
    if (!this.sidebarExpanded) {
      this.open.mc = false;
      this.open.omk = false;
      this.open.exam = false;
    }
  }

  toggle(key: 'mc' | 'omk' | 'exam') {
    if (this.sidebarExpanded) {
      this.open[key] = !this.open[key];
    }
  }

  ripple(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    let ripple = target.querySelector('.ripple') as HTMLElement | null;
    if (ripple) ripple.remove();
    ripple = document.createElement('span') as HTMLElement;
    ripple.className = 'ripple';
    const rect = target.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    target.appendChild(ripple);
    setTimeout(() => ripple?.remove(), 600);
  }

  onChangeLang(lang: any) {
    console.log("onChangeLang: " + lang);
    this.selectedLang = lang;
    this.translationService.setLanguage(lang.code);
  }
}
