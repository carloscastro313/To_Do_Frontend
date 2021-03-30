import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private folders : [] = [];
  constructor(private http: HttpClient) {

  }

  public get folderList(){
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    return new Promise<any>((resolve,rejects) =>{
      this.http.get('https://examen-todo-app.herokuapp.com/folder/list',{
        headers:{
          id,
          token
        }
      }).subscribe(data => resolve(data), err => rejects());
    });
  }

  public removerFolder(id){
    const token = localStorage.getItem('token');
    return new Promise<void>((resolve,rejects) =>{
      this.http.delete('https://examen-todo-app.herokuapp.com/folder/'+id,{
        headers: {
          token
        }
      }).subscribe(data => resolve(), err => rejects());
    });
  }

  public addFolder(FolderName){
    const token = localStorage.getItem('token');
    const UserId = localStorage.getItem('id');
    return new Promise<void>((resolve,rejects) =>{
      this.http.post('https://examen-todo-app.herokuapp.com/folder/',{
        UserId,
        FolderName
      },
      {
        headers: {
          token
        },
      }).subscribe(data => resolve(), err => rejects(err));
    });
  }

  public getTasks(id){
    const token = localStorage.getItem('token');
    return new Promise<any>((resolve,rejects) =>{
      this.http.get('https://examen-todo-app.herokuapp.com/task/list',
      {
        headers: {
          token,
          id
        },
      }).subscribe(data => resolve(data), err => rejects(err));
    });
  }

  public addTask(Instruction, FolderId : number){
    const token = localStorage.getItem('token');
    return new Promise<void>((resolve,rejects) =>{
      this.http.post('https://examen-todo-app.herokuapp.com/task/',{
        FolderId,
        Instruction
      },
      {
        headers: {
          token
        },
      }).subscribe(data => resolve(), err => rejects(err));
    });
  }

  public updateTask(id,Instruction, IsDone : boolean){
    const token = localStorage.getItem('token');
    return new Promise<void>((resolve,rejects) =>{
      this.http.put('https://examen-todo-app.herokuapp.com/task/'+id,{
        Instruction,
        IsDone
      },
      {
        headers: {
          token
        },
      }).subscribe(data => resolve(), err => rejects(err.msg));
    });
  }

  public deleteTask(id){
    const token = localStorage.getItem('token');
    return new Promise<void>((resolve,rejects) =>{
      this.http.delete('https://examen-todo-app.herokuapp.com/task/'+id,
      {
        headers: {
          token
        },
      }).subscribe(data => resolve(), err => rejects(err.msg));
    });
  }
}
