import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { APIService } from '../../app_services/api.service';
import { APIData  , ProductData } from '../../app_services/models/api.data.structure'

//selectore used ba3d keda as a tag, 3shan in another html file yeb2a called, w howa ye-load el template beta3o
@Component({
  selector: 'store',
  templateUrl: './template/store.component.html',
  styleUrls: ['./template/store.component.scss']
})

export class StoreComponent implements OnInit {

  ngOnInit() {
  }
//da el settings array el bab3ato lel template

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
     actions:{
      // add:false,
      // edit:false,
      // delete:false,
    //   //columnTitle:'Search'
     },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'number',
      },
      createdAt: {
        title: 'CreatedAt',
        type: 'string',
      },
      updatedAt: {
        title: 'UpdatedAt',
        type: 'string',
      },
      seller: {
        title: 'Seller',
        type: 'string',
      },
    },
  };

//da el source beta3y
  source: LocalDataSource = new LocalDataSource();

//el data beteb2a loaded fel local, fa ana ba2olo shouf 7aga 3ala shakl el product data w eb3atha le create product
//Same thing lel response, loads the response el gayelly men el backend

  constructor(private _apiService: APIService) {
    this.source.onAdded().subscribe((productData :ProductData)=>{
      this._apiService.createProduct(productData).subscribe((apiresponse: APIData)=>{
        console.log(apiresponse.msg);
      });
    });

    this._apiService.getProducts().subscribe((apiresponse: APIData)=>{
       for (var i=0 ; i<apiresponse.data.length;i++)
       apiresponse.data[i].id = (i+1);

       console.log(apiresponse.data[0]);
      this.source.load( apiresponse.data);
    });

    this.source.onRemoved().subscribe((productData:ProductData)=>{
      this._apiService.deleteProduct(productData).subscribe((apiresponse: APIData)=>{
        console.log(apiresponse.msg);
      });
    });

    this.source.onUpdated().subscribe((productData :ProductData)=>{
         this._apiService.editProduct(productData).subscribe((apiresponse: APIData)=>{
           console.log(apiresponse);
         });
       });




  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
