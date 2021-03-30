import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;

  loading: boolean = false;
  folderName: string = '';
  taskName: string = '';
  id : number;
  taskId : number;
  taskIsDone : boolean;
  page_size: number = 6;
  page_number: number = 1;
  page_SizeOptions: number[] = [3,4,6,8];
  list : [] = [];
  myForm : FormGroup;
  error : string = '';
  edit = false;

  constructor(
    private task : TaskService,
    private fb : FormBuilder,
    private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.folderName = params['name'];
    })
    this.myForm = this.fb.group({
      Instruction : ['',[
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(1),
      ]],
    })
    this.updateList();
  }

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  updateList(){
    this.task.getTasks(this.id).then((data) => this.list = data);

  }


  add(){
    if( this.myForm.valid){
      this.loading = true;
      this.task.addTask(this.myForm.get('Instruction').value,this.id)
        .then(()=> {
          this.updateList();
          this.error = '';
          this.myForm.get('Instruction').setValue('');
          this.myForm.markAsUntouched();
        })
        .catch(err => this.error = err)
        .finally(()=> this.loading = false);
    }
  }

  update(Instruction){
    if( this.myForm.valid){
      this.loading = true;
      this.task.updateTask(this.taskId,Instruction,this.taskIsDone)
        .then(()=> {
          this.updateList();
          this.error = '';
          this.edit = false;
          this.myForm.get('Instruction').setValue('');
          this.myForm.markAsUntouched();
        })
        .catch(err => this.error = err)
        .finally(()=> this.loading = false);
    }
  }

  editTask(id,Instruction,isDone){
    this.myForm.get('Instruction').setValue(Instruction);
    this.taskId = id;
    this.taskIsDone = isDone;
    this.edit = true;
    this.taskName = Instruction;
  }

  taskComplete(id,Instruction,isDone){
    this.loading = true;
    this.task.updateTask(id,Instruction, !isDone)
        .then(()=> this.updateList())
        .finally(()=> this.loading = false);
  }

  removeTask(id){
    this.loading = true;
    this.task.deleteTask(id)
        .then(()=> this.updateList())
        .finally(()=> this.loading = false);
  }

}
