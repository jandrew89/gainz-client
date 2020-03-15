import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/data/services/loader.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  loading: boolean;
  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    })
   }

  ngOnInit() {
  }

}
