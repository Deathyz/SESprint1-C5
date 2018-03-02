import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { APIService } from '../../app_services/api.service';
import { APIData  , ProductData } from '../../app_services/models/api.data.structure'


@Component({
  selector: 'store',
  templateUrl: './template/store.component.html',
  styleUrls: ['./template/store.component.scss']
})

export class StoreComponent implements OnInit {

    ngOnInit() {
      let type: string = localStorage.getItem('currentUser')
      if(type.indexOf('admin') != -1){
        console.log('admin');
        this.settings.actions={
          add: true,
        edit: true,
         delete: true,
        };
       
      }
      else if(type.indexOf('manager') != -1){
        console.log('manager');
        this.settings.actions={
          add: true,
        edit: true,
         delete: false,
        };
       
      
      }
      else{
        console.log('user');
        this.settings.actions={
          add: false,
        edit: false,
         delete: false,
        };
       
      }
    
    this.referesh();
  }
  settings = {
    editor: {
      config: false
    },
    actions:{
      // add: false,
      // edit: false,
      //  delete: false,
    },
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
    columns:{
      id: {
        title: 'ID',
        type: 'number',
        editable : false,
        addable :false,
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
        editable : false,
        addable :false,
      },
      updatedAt: {
        title: 'UpdatedAt',
        type: 'string',
        editable : false,
        addable :false,
      },
      seller: {
        title: 'Seller',
        type: 'string',
        
      },
    },

};
source: LocalDataSource = new LocalDataSource();

  constructor(private _apiService: APIService) {
    
    this.source.onAdded().subscribe((productData :ProductData)=>{
      this._apiService.createProduct(productData).subscribe((apiresponse: APIData)=>{
        console.log(apiresponse.msg);
        this.referesh();  
      });
    });

    this._apiService.getProducts().subscribe((apiresponse: APIData)=>{
      for (var i = 0 ; i < apiresponse.data.length ; i++ )
        apiresponse.data[i].id = (i+1);
      
      console.log(apiresponse.data[0]);
      this.source.load( apiresponse.data);
      
    });
  

    this.source.onRemoved().subscribe((productData :ProductData)=>{
      console.log(productData);
      this._apiService.deleteProduct(productData).subscribe((apiresponse: APIData)=>{
        console.log(apiresponse);
        this.referesh();
      });


    });
    this.source.onUpdated().subscribe((productData :ProductData)=>{
      this._apiService.editProduct(productData).subscribe((apiresponse: APIData)=>{
        console.log(apiresponse);
        this.referesh();
      });

    });
  
  
}
referesh(): void {
  this._apiService.getProducts().subscribe((apiresponse: APIData)=>{
    for (var i = 0 ; i < apiresponse.data.length ; i++ )
      apiresponse.data[i].id = (i+1);
    this.source.load(apiresponse.data);
  });
}
onDeleteConfirm(event): void {
    event.confirm.resolve();
}
}
