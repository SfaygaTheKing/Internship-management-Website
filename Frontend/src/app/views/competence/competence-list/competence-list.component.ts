import { AuthService } from './../../../controllers/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CompetenceService } from '../../../controllers/competence/competence.service';
import { Competence } from '../../../models/competence/competence';
import * as FileSaver from 'file-saver';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
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
  selector: 'app-competence-list',
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
  templateUrl: './competence-list.component.html',
  styleUrl: './competence-list.component.css',
})
export class CompetenceListComponent implements OnInit {
  items: MenuItem[] | undefined;
  @ViewChild('dt') dataTable!: Table;
  columns!: Column[];
  exportColumns!: ExportColumn[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private competenceService: CompetenceService
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
      { field: 'code', header: 'Code' },
      { field: 'libelle', header: 'Libelle' },
    ];

    this.exportColumns = this.columns.map((column) => ({
      title: column.header,
      dataKey: column.field,
    }));
  }

  ngOnInit() {
    this.competenceService.findAll().subscribe({
      next: (data) => (this.competences = data),
      error: (e) => console.error(e),
    });
  }

  create(): void {
    this.router.navigate(['competence/create']);
  }

  edit(competence: Competence): void {
    this.selectedCompetence = competence;
    this.router.navigate(['competence/edit']);
  }

  view(competence: Competence): void {
    this.selectedCompetence = competence;
    this.router.navigate(['competence/view']);
  }

  delete(competence: Competence): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      acceptButtonStyleClass: 'p-button-success',
      rejectLabel: 'Non',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.competenceService.deleteByCode(competence.code).subscribe({
          next: (data) => {
            if (data === 1) {
              this.competences = this.competences.filter(
                (e) => e.id !== competence.id
              );
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Compétence enseignée supprimé',
                life: 3000,
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Échec',
                detail:
                  "Compétence enseignée non supprimé : lié à d'autres enregistrements supprimez-les avant de réessayer",
                life: 3000,
              });
            }
          },
          error: (e) => console.error(e),
        });
      },
    });
  }

  exportPdf(): void {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(this.exportColumns, this.competences);
        doc.save('data.pdf');
      });
    });
  }

  exportExcel(): void {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.competences);
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

  isAdmin(): boolean {
    if (this.authService.retrieveUser().user.role === 'ADMIN') return true;
    return false;
  }

  public get selectedCompetence(): Competence {
    return this.competenceService.selectedCompetence;
  }
  public set selectedCompetence(value: Competence) {
    this.competenceService.selectedCompetence = value;
  }

  public get competences(): Array<Competence> {
    return this.competenceService.competences;
  }
  public set competences(value: Array<Competence>) {
    this.competenceService.competences = value;
  }
}
