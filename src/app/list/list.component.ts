import { Component } from '@angular/core';
import { Repository } from "../models/repository";

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent
{
  constructor(public repo: Repository)
  {

  }

  selectVideo(id: number)
  {
    this.repo.selectVideo(id);
  }
}
