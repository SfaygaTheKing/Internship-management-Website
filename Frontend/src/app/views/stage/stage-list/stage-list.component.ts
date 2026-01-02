import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { StageService } from '../../../controllers/stage/stage.service';
import { Stage } from '../../../models/stage/stage';
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
  selector: 'app-stage-list',
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
  templateUrl: './stage-list.component.html',
  styleUrl: './stage-list.component.css',
})
export class StageListComponent implements OnInit {
  items: MenuItem[] | undefined;
  @ViewChild('dt') dataTable!: Table;
  columns!: Column[];
  exportColumns!: ExportColumn[];

  modifiedStages!: Array<Stage>;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private stageService: StageService
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
      { field: 'numero', header: 'Numero' },
      { field: 'typeStage.type', header: 'Type de stage' },
      { field: 'annee.annee', header: 'Année de stage' },
      { field: 'etudiant.nom', header: 'Étudiant' },
    ];

    this.exportColumns = this.columns.map((column) => ({
      title: column.header,
      dataKey: column.field,
    }));
  }

  ngOnInit() {
    this.modifiedStages = new Array<Stage>();
    this.stageService.findAll().subscribe({
      next: (data) => {
        this.stages = data;
        data.forEach((e) => {
          let c = { ...e };
          c.etudiant = { ...e.etudiant };
          c.etudiant.nom = c.etudiant.nom + ' ' + c.etudiant.prenom;
          this.modifiedStages.push(c);
        });
      },
      error: (e) => console.error(e),
    });
  }

  create(): void {
    this.router.navigate(['stage/create']);
  }

  edit(stage: Stage): void {
    stage = this.stages.find((e) => e.id === stage.id)!;
    this.selectedStage = stage;
    this.router.navigate(['stage/edit']);
  }

  view(stage: Stage): void {
    stage = this.stages.find((e) => e.id === stage.id)!;
    this.selectedStage = stage;
    this.router.navigate(['stage/view']);
  }

  delete(stage: Stage): void {
    stage = this.stages.find((e) => e.id === stage.id)!;
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      acceptButtonStyleClass: 'p-button-success',
      rejectLabel: 'Non',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.stageService.deleteByNumero(stage.numero).subscribe({
          next: () => {
            this.stages = this.stages.filter((e) => e.id !== stage.id);
            this.modifiedStages = this.modifiedStages.filter(
              (e) => e.id !== stage.id
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Stage supprimé',
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
        (doc as any).autoTable(this.exportColumns, this.stages);
        doc.save('data.pdf');
      });
    });
  }

  exportExcel(): void {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.stages);
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

  public get selectedStage(): Stage {
    return this.stageService.selectedStage;
  }
  public set selectedStage(value: Stage) {
    this.stageService.selectedStage = value;
  }
  public get stages(): Array<Stage> {
    return this.stageService.stages;
  }
  public set stages(value: Array<Stage>) {
    this.stageService.stages = value;
  }
}
