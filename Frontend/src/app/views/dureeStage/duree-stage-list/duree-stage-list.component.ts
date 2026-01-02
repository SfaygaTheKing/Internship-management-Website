import { DureeStageService } from './../../../controllers/dureeStage/duree-stage.service';
import { Component, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { DureeStage } from '../../../models/dureeStage/duree-stage';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { Table, TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-duree-stage-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    TableModule,
    ToolbarModule,
    MenuModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
  ],
  templateUrl: './duree-stage-list.component.html',
  styleUrl: './duree-stage-list.component.css',
})
export class DureeStageListComponent {
  items: MenuItem[] | undefined;
  @ViewChild('dt') dataTable!: Table;
  columns!: Column[];
  exportColumns!: ExportColumn[];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dureeStageService: DureeStageService
  ) {
    this.items = [
      {
        label: 'CSV',
        icon: 'pi pi-fw pi-file',
        command: () => {
          this.dataTable.exportCSV();
        },
      },
      {
        label: 'Excel',
        icon: 'pi pi-fw pi-file-excel',
        command: () => {
          this.exportExcel();
        },
      },
      {
        label: 'PDF',
        icon: 'pi pi-fw pi-file-pdf',
        command: () => {
          this.exportPdf();
        },
      },
    ];
    this.columns = [
      { field: 'typeStage.type', header: 'Type de stage' },
      { field: 'annee.annee', header: 'Année de stage' },
      { field: 'debut', header: 'Date de début' },
      { field: 'fin', header: 'Date de fin' },
    ];

    this.exportColumns = this.columns.map((column) => ({
      title: column.header,
      dataKey: column.field,
    }));
  }

  ngOnInit() {
    this.dureeStageService.findAll().subscribe({
      next: (data) => (this.dureesStage = data),
      error: (e) => console.error(e),
    });
  }

  create(): void {
    this.router.navigate(['dureeStage/create']);
  }

  edit(dureeStage: DureeStage): void {
    this.selectedDureeStage = dureeStage;
    this.router.navigate(['dureeStage/edit']);
  }

  view(dureeStage: DureeStage): void {
    this.selectedDureeStage = dureeStage;
    this.router.navigate(['dureeStage/view']);
  }

  delete(dureeStage: DureeStage): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      acceptButtonStyleClass: 'p-button-success',
      rejectLabel: 'Non',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.dureeStageService
          .deleteByAnneeAnneeAndTypeStageType(
            dureeStage.annee.annee,
            dureeStage.typeStage.type
          )
          .subscribe({
            next: () => {
              this.dureesStage = this.dureesStage.filter(
                (e) => e.id !== dureeStage.id
              );
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Durée de stage supprimé',
                life: 3000,
              });
            },
            error: (e) => console.error(e),
          });
      },
    });
  }

  getDate(date: Date) {
    const originalDate = new Date(date);
    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    const year = originalDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  exportPdf(): void {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(this.exportColumns, this.dureesStage);
        doc.save('data.pdf');
      });
    });
  }

  exportExcel(): void {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.dureesStage);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'data');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  public get selectedDureeStage(): DureeStage {
    return this.dureeStageService.selectedDureeStage;
  }
  public set selectedDureeStage(value: DureeStage) {
    this.dureeStageService.selectedDureeStage = value;
  }

  public get dureesStage(): Array<DureeStage> {
    return this.dureeStageService.dureesStage;
  }
  public set dureesStage(value: Array<DureeStage>) {
    this.dureeStageService.dureesStage = value;
  }
}
