import { PageableCar } from './../../common/pageable-car';
import { Component, OnInit } from '@angular/core';
import { PageableCarService } from 'src/app/services/pageable-car.service';

@Component({
  selector: 'app-pageable-car-list',
  templateUrl: './pageable-car-list.component.html',
  styleUrls: ['./pageable-car-list.component.css']
})
export class PageableCarListComponent implements OnInit {

  pageableCars : PageableCar[];

  constructor(private pageableCarService: PageableCarService) { }

  ngOnInit(): void {
    this.callPageableCars();
  }
  callPageableCars() {
    this.pageableCarService.callPageableCars().subscribe(
      data=>{this.pageableCars = data;}
    );
    
    
    }
}
 

