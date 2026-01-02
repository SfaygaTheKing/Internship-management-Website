import { AuthService } from './../../../controllers/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CompetenceRequiseService } from '../../../controllers/competenceRequise/competence-requise.service';
import * as FileSaver from 'file-saver';
import { CompetenceRequise } from '../../../models/competenceRequise/competence-requise';
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
  selector: 'app-competence-requise-list',
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
  templateUrl: './competence-requise-list.component.html',
  styleUrl: './competence-requise-list.component.css',
})
export class CompetenceRequiseListComponent implements OnInit {
  items: MenuItem[] | undefined;
  @ViewChild('dt') dataTable!: Table;
  columns!: Column[];
  exportColumns!: ExportColumn[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private competenceRequiseService: CompetenceRequiseService
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
      { field: 'competence.code', header: 'Compétence enseignée' },
      { field: 'typeStage.type', header: 'Type de stage' },
      { field: 'niveau', header: 'Niveau exigé' },
    ];

    this.exportColumns = this.columns.map((column) => ({
      title: column.header,
      dataKey: column.field,
    }));
  }

  ngOnInit() {
    this.competenceRequiseService.findAll().subscribe({
      next: (data) => (this.competencesRequises = data),
      error: (e) => console.error(e),
    });
  }

  create(): void {
    this.router.navigate(['competenceRequise/create']);
  }

  edit(competenceRequise: CompetenceRequise): void {
    this.selectedCompetenceRequise = competenceRequise;
    this.router.navigate(['competenceRequise/edit']);
  }

  view(competenceRequise: CompetenceRequise): void {
    this.selectedCompetenceRequise = competenceRequise;
    this.router.navigate(['competenceRequise/view']);
  }

  delete(competenceRequise: CompetenceRequise): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      acceptButtonStyleClass: 'p-button-success',
      rejectLabel: 'Non',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.competenceRequiseService
          .deleteByCompetenceCodeAndTypeStageType(
            competenceRequise.competence.code,
            competenceRequise.typeStage.type
          )
          .subscribe({
            next: () => {
              this.competencesRequises = this.competencesRequises.filter(
                (e) => e.id !== competenceRequise.id
              );
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Compétence à acquérir supprimé',
                life: 3000,
              });
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
        (doc as any).autoTable(this.exportColumns, this.competencesRequises);
        doc.save('data.pdf');
      });
    });
  }

  exportExcel(): void {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.competencesRequises);
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

  public get selectedCompetenceRequise(): CompetenceRequise {
    return this.competenceRequiseService.selectedCompetenceRequise;
  }
  public set selectedCompetenceRequise(value: CompetenceRequise) {
    this.competenceRequiseService.selectedCompetenceRequise = value;
  }
  public get competencesRequises(): Array<CompetenceRequise> {
    return this.competenceRequiseService.competencesRequises;
  }
  public set competencesRequises(value: Array<CompetenceRequise>) {
    this.competenceRequiseService.competencesRequises = value;
  }
}
