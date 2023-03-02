import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filterdata: string): any {
    if(!items) return [];
    if(!filterdata) return items;
    filterdata=filterdata.toLowerCase()
    return items.filter((items)=>{
       return          JSON.stringify(items.PersonalDetails.firstname).toLowerCase().includes(filterdata) ||
                       JSON.stringify(items.PersonalDetails.lastname).toLowerCase().includes(filterdata) ||
                       JSON.stringify(items.JobDetails.companyname).toLowerCase().includes(filterdata)||
                       JSON.stringify(items.PersonalDetails.educationtype).toLowerCase().includes(filterdata)
    })
  }

}
