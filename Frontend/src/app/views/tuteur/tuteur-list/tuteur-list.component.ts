import { Tuteur } from './../../../models/tuteur/tuteur';
import { Table, TableModule } from 'primeng/table';
import { TuteurService } from './../../../controllers/tuteur/tuteur.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import * as FileSaver from 'file-saver';

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
  selector: 'app-tuteur-list',
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
  templateUrl: './tuteur-list.component.html',
  styleUrl: './tuteur-list.component.css',
})
export class TuteurListComponent implements OnInit {
  items: MenuItem[] | undefined;
  @ViewChild('dt') dataTable!: Table;
  columns!: Column[];
  exportColumns!: ExportColumn[];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tuteurService: TuteurService
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
      { field: 'nom', header: 'Nom' },
      { field: 'prenom', header: 'Prénom' },
      { field: 'entreprise.raisonSociale', header: 'Entreprise' },
    ];

    this.exportColumns = this.columns.map((column) => ({
      title: column.header,
      dataKey: column.field,
    }));
  }

  ngOnInit() {
    this.tuteurService.findAll().subscribe({
      next: (data) => (this.tuteurs = data),
      error: (e) => console.error(e),
    });
  }

  create(): void {
    this.router.navigate(['tuteur/create']);
  }

  edit(tuteur: Tuteur): void {
    this.selectedTuteur = tuteur;
    this.router.navigate(['tuteur/edit']);
  }

  view(tuteur: Tuteur): void {
    this.selectedTuteur = tuteur;
    this.router.navigate(['tuteur/view']);
  }

  delete(tuteur: Tuteur): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      acceptButtonStyleClass: 'p-button-success',
      rejectLabel: 'Non',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.tuteurService.deleteByNumero(tuteur.numero).subscribe({
          next: (data) => {
            if (data === 1) {
              this.tuteurs = this.tuteurs.filter((e) => e.id !== tuteur.id);
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Tuteur supprimé',
                life: 3000,
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Échec',
                detail:
                  "Tuteur non supprimé : lié à d'autres enregistrements supprimez-les avant de réessayer",
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
        (doc as any).autoTable(this.exportColumns, this.tuteurs);
        doc.save('data.pdf');
      });
    });
  }

  exportExcel(): void {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.tuteurs);
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

  public get selectedTuteur(): Tuteur {
    return this.tuteurService.selectedTuteur;
  }
  public set selectedTuteur(value: Tuteur) {
    this.tuteurService.selectedTuteur = value;
  }
  public get tuteurs(): Array<Tuteur> {
    return this.tuteurService.tuteurs;
  }
  public set tuteurs(value: Array<Tuteur>) {
    this.tuteurService.tuteurs = value;
  }
}
