import { AuthService } from './../../../controllers/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { PromotionService } from '../../../controllers/promotion/promotion.service';
import { Promotion } from '../../../models/promotion/promotion';
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
  selector: 'app-promotion-list',
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
  templateUrl: './promotion-list.component.html',
  styleUrl: './promotion-list.component.css',
})
export class PromotionListComponent implements OnInit {
  items: MenuItem[] | undefined;
  @ViewChild('dt') dataTable!: Table;
  columns!: Column[];
  exportColumns!: ExportColumn[];

  modifiedPromotions!: Array<Promotion>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private promotionService: PromotionService
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
      { field: 'annee', header: 'Année' },
      { field: 'idEtudiant', header: "Nombre d'étudiants" },
      { field: 'professeur.nom', header: 'Professeur' },
    ];

    this.exportColumns = this.columns.map((column) => ({
      title: column.header,
      dataKey: column.field,
    }));
  }

  ngOnInit() {
    this.modifiedPromotions = new Array<Promotion>();
    this.promotionService.findAll().subscribe({
      next: (data) => {
        this.promotions = data;
        data.forEach((e) => {
          let c = { ...e };
          c.professeur = { ...e.professeur };
          c.idEtudiant = c.idEtudiant - 1;
          c.professeur.nom = c.professeur.nom + ' ' + c.professeur.prenom;
          this.modifiedPromotions.push(c);
        });
      },
      error: (e) => console.error(e),
    });
  }

  create(): void {
    this.router.navigate(['promotion/create']);
  }

  edit(promotion: Promotion): void {
    promotion = this.promotions.find((e) => e.id === promotion.id)!;
    this.selectedPromotion = promotion;
    this.router.navigate(['promotion/edit']);
  }

  view(promotion: Promotion): void {
    promotion = this.promotions.find((e) => e.id === promotion.id)!;
    this.selectedPromotion = promotion;
    this.router.navigate(['promotion/view']);
  }

  delete(promotion: Promotion): void {
    promotion = this.promotions.find((e) => e.id === promotion.id)!;
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      acceptButtonStyleClass: 'p-button-success',
      rejectLabel: 'Non',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.promotionService.deleteByAnnee(promotion.annee).subscribe({
          next: (data) => {
            if (data === 1) {
              this.promotions = this.promotions.filter(
                (e) => e.id !== promotion.id
              );
              this.modifiedPromotions = this.modifiedPromotions.filter(
                (e) => e.id !== promotion.id
              );
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Promotion supprimé',
                life: 3000,
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Échec',
                detail:
                  "Promotion non supprimé : lié à d'autres enregistrements supprimez-les avant de réessayer",
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
        (doc as any).autoTable(this.exportColumns, this.promotions);
        doc.save('data.pdf');
      });
    });
  }

  exportExcel(): void {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.promotions);
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

  public get selectedPromotion(): Promotion {
    return this.promotionService.selectedPromotion;
  }
  public set selectedPromotion(value: Promotion) {
    this.promotionService.selectedPromotion = value;
  }
  public get promotions(): Array<Promotion> {
    return this.promotionService.promotions;
  }
  public set promotions(value: Array<Promotion>) {
    this.promotionService.promotions = value;
  }
}
