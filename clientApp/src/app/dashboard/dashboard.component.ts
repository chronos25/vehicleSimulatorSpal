import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  li:any; 
  data=[{
    id:Number,
    lat:Number,
    long:Number,
    speed:Number
  }];
  
  
  displayedColumns: string[] = ['id', 'lat', 'long', 'speed'];
  dataSource=[{
    id:Number,
    lat:Number,
    long:Number,
    speed:Number
  }];

  constructor(private http: HttpClient ) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/vehicle')
    .subscribe(res => { 
  
      // If response comes hideloader() function is called 
      // to hide that loader  
      //console.log(res) 
      this.li=res;
      var i;
      this.data.pop();
      this.dataSource.pop();
      for(i=0;i<Object.keys(res).length;){
        let obj={
          id:Number,
          lat:Number,
          long:Number,
          speed:Number
        };  
        //console.log(res[i]);
        obj.id = res[i].id;
        obj.lat = res[i].lat;
        obj.long = res[i].long;
        obj.speed = res[i].speed;
        this.data.push(obj);
        i++;
      }
     this.dataSource = this.data;
      
    });
    setTimeout(() => {this.ngOnInit()}, 1000);
  } 

}