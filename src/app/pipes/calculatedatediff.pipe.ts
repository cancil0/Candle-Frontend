import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'calculateDateDiff'
})
export class CalculateDateDiffPipe implements PipeTransform {

  dateNow:Date = new Date();

  constructor(private translate:TranslateService){}
  transform(date: Date): string {
    const convDate = new Date(date)
    const diffTime = Math.floor(this.dateNow.getTime() - convDate.getTime());
    var resource = '';
    const diffSec = Math.floor(diffTime / 1000);
    if(diffSec < 60){
      if(diffSec === 1){
        resource = this.translate.instant('Pipe.CalculateDateDiffPipe.Second');
        return resource.replace('{0}', diffSec.toString());
      }
      resource = this.translate.instant('Pipe.CalculateDateDiffPipe.Seconds');
      return resource.replace('{0}', diffSec.toString());
    }

    const diffMin = Math.floor(diffSec / 60);
    if(diffMin < 60 ){
      if(diffMin === 1){
        resource = this.translate.instant('Pipe.CalculateDateDiffPipe.Minute');
        return resource.replace('{0}', diffMin.toString());
      }
      resource = this.translate.instant('Pipe.CalculateDateDiffPipe.Minutes');
      return resource.replace('{0}', diffMin.toString());
    }

    const diffHour = Math.floor(diffMin / 60);
    if(diffHour < 24){
      if(diffHour === 1){
        resource = this.translate.instant('Pipe.CalculateDateDiffPipe.Hour');
        return resource.replace('{0}', diffHour.toString());
      }
      resource = this.translate.instant('Pipe.CalculateDateDiffPipe.Hours');
      return resource.replace('{0}', diffHour.toString());
    }

    const diffDays = Math.floor(diffHour / 24); 
    if(diffDays >= 1 && diffDays <= 30){
      if(diffDays === 1){
        resource = this.translate.instant('Pipe.CalculateDateDiffPipe.Day');
        return resource.replace('{0}', diffDays.toString());
      }
      resource = this.translate.instant('Pipe.CalculateDateDiffPipe.Days');
      return resource.replace('{0}', diffDays.toString());
    }

    const diffMonths = Math.floor(diffDays / 30); 
    if(diffMonths >= 1 && diffMonths <= 12){
      if(diffMonths === 1){
        resource = this.translate.instant('Pipe.CalculateDateDiffPipe.Month');
        return resource.replace('{0}', diffMonths.toString());
      }
      resource = this.translate.instant('Pipe.CalculateDateDiffPipe.Months');
      return resource.replace('{0}', diffMonths.toString());
    }

    const diffYears = Math.floor(diffMonths / 12); 
    if(diffYears >= 1){
      if(diffYears === 1){
        resource = this.translate.instant('Pipe.CalculateDateDiffPipe.Year');
        return resource.replace('{0}', diffYears.toString());
      }
      resource = this.translate.instant('Pipe.CalculateDateDiffPipe.Years');
      return resource.replace('{0}', diffYears.toString());
    }

    return resource;
  }

}
