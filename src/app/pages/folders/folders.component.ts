import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { TaskService } from '../../services/task.service';

@Component({
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;

  loading : boolean = false;
  error: string = '';
  page_size: number = 6;
  page_number: number = 1;
  page_SizeOptions: number[] = [3,4,6];
  list : [] = [];
  myForm : FormGroup;

  constructor(
    private task : TaskService,
    private fb : FormBuilder,
    ) { }

  ngOnInit(): void {
    this.updateList();

    this.myForm = this.fb.group({
      FolderName : ['',[
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(1),
      ]],
    })
  }

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  updateList(){
    this.task.folderList.then((data) => {
      this.list = data;
      this.myForm.get('FolderName').setValue('');
      this.myForm.markAsUntouched();
    });
  }

  remove(id){
    this.loading = true;
    this.task.removerFolder(id)
        .then(()=> this.updateList())
        .catch()
        .finally(() => this.loading = false);;
  }

  add(){
    this.loading = true;
    this.task.addFolder(this.myForm.get('FolderName').value)
        .then(()=> {
          this.updateList()
          this.error = '';
        })
        .catch(err => this.error = err.error.msg)
        .finally(() => this.loading = false);
  }

}
