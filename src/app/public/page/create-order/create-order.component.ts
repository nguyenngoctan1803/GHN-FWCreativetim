import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'app/public/service/customer.service';
import { minArrayLengthValidator } from 'app/shared/utils/validator/custom-validator';
import { NgWizardConfig, NgWizardModule, NgWizardService, STEP_STATE, StepChangedArgs, StepValidationArgs, THEME } from 'ng-wizard';
import { ToastrService } from 'ngx-toastr';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction, Subject, switchMap } from 'rxjs';
import { DomSanitizer, SafeHtml, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { NgSelect2Component } from 'ng-select2';
import { MapService } from 'app/public/service/map.service';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  orderForm: FormGroup;
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };
  buttonNextClass: string = 'secondary';
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    lang: { next: 'Tiếp theo', previous: 'Trước đó' },
    toolbarSettings: { showNextButton: false, showPreviousButton: false },
    anchorSettings: { enableAllAnchors: true, markDoneStep: true },
  };
  //location
  formatter = (result: any) => {
    const displayName = result.display_name;
    const limit = 80;
    return displayName.length > limit ? `${displayName.substring(0, limit)}...` : displayName;
  };
  inputFormatterTake = (result: any) => {
    this.selectedLocationTake = result;
    return result.display_name;
  } 
  inputFormatterGive = (result: any) => {
    this.selectedLocationGive = result;
    return result.display_name;
  } 
  location: string = '';
  locationSearch: any[] = [];
  selectedLocationTake: any = {};
  selectedLocationGive: any = {};
  summary: {
    distance: number,
    duration: string,
    total_weight: number,
    total_surchange: number,
    total: number
  } = {
    distance: 0,
    duration: '',
    total_weight: 0,
    total_surchange: 0,
    total: 0
  };
  pricePerDistance: number = 5000;
  pricePerWeight: number = 1000;
  surchargeDistance: number = 500;
  surchargeWeight: number = 1000;
  surchargeTime: number = 2000;
  surchargeConditionDistance: number = 20;
  surchargeConditionWeight: number = 15;
  constructor(
    private router:Router, 
    private customerService: CustomerService,
    private mapService: MapService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private ngWizardService: NgWizardService,
  ) { }

  
  ngOnInit() {
    this.orderForm = this.fb.group({
      khachHangID: [0, Validators.required],
      diaChiNhanHang: ['', Validators.required],
      diaChiGiaoHang: ['', Validators.required],
      soDienThoaiNguoiNhan: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      soDienThoaiNguoiGui: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      chiTietDonHang: this.fb.array([this.createChiTietDonHang()], [minArrayLengthValidator(1)])
    });
  }
    // Tạo FormGroup cho chiTietDonHang
    createChiTietDonHang(): FormGroup {
      return this.fb.group({
        tenHangHoa: ['', Validators.required],
        tienThuHoCOD: [0, Validators.required],
        khoiLuong: [0, Validators.required]
      });
    }
  
    // Trả về FormArray của chiTietDonHang
    get chiTietDonHang(): FormArray {
      return this.orderForm.get('chiTietDonHang') as FormArray;
    }
  
    // Thêm chi tiết đơn hàng mới vào FormArray
    addChiTietDonHang() {
      this.chiTietDonHang.push(this.createChiTietDonHang());
    }
  
    // Xóa chi tiết đơn hàng khỏi FormArray
    removeChiTietDonHang(index: number) {
      this.chiTietDonHang.removeAt(index);
    }
  // tiền
  loadStatistical(){
    this.summary.total_weight = this.chiTietDonHang.controls.reduce((total, chiTiet) => {
      return total + chiTiet.get('khoiLuong').value;
    }, 0);
    const payload = {
      "coordinates": [
        [this.selectedLocationTake.lon, this.selectedLocationTake.lat],
        [this.selectedLocationGive.lon, this.selectedLocationGive.lat]
      ]
    }
    this.mapService.getDistance(payload).subscribe(
      (response: any) => {
        this.tranferSummary(response.routes[0]);
      },
      error => {
        this.summary.distance = 0;
        this.summary.total_weight = 0;
        this.summary.duration = '';
        this.summary.total = 0;
        this.toastr.error('Tính toán khoảng cách không thành công','Thông báo'); 
      }
    );

  }

  tranferSummary(summary: any){
    this.summary.distance = this.convertMetersToKilometers(summary.summary.distance ?? 0);
    this.summary.duration = this.convertSecondsToReadableTime(summary.summary.duration ?? 0);
    const total_distance =  this.summary.distance * this.pricePerDistance;
    const total_weight =  this.summary.total_weight * this.pricePerWeight;
    const surchargeDistancee = this.summary.distance > this.surchargeConditionDistance ? ((this.summary.distance - this.surchargeConditionDistance) * this.surchargeDistance) : 0;
    const surchargeWeightt = this.summary.total_weight > this.surchargeConditionWeight ? ((this.summary.total_weight - this.surchargeConditionWeight) * this.surchargeWeight * this.summary.distance ) : 0;
    const surchargeTimee = this.checkTimeOrder() ?  this.surchargeTime * this.summary.distance : 0;
    this.summary.total_surchange = surchargeDistancee + surchargeWeightt + surchargeTimee;
    this.summary.total = total_distance + total_weight + surchargeDistancee + surchargeWeightt + surchargeTimee;
  }
  convertMetersToKilometers(meters: number): number {
    return parseFloat((meters / 1000).toFixed(1));
  }
  convertSecondsToReadableTime(seconds: number): string {
    if (seconds < 3600) {
      return Math.floor(seconds / 60)?.toString() + ' phút';
    } else {
      const hours = seconds / 3600;
      return hours?.toString() + ' phút';
    }
  }
  getTotalKhoiLuong(): number {
    return this.chiTietDonHang.controls.reduce((total, chiTiet) => {
      return total + chiTiet.get('khoiLuong').value;
    }, 0);
  }
  checkTimeOrder(): boolean {
    const now = new Date();
    const currentHour = now.getHours();
    // Kiểm tra nếu giờ hiện tại nằm ngoài khoảng từ 6h sáng đến 18h chiều
    return (currentHour >= 18 || currentHour < 6);
  }
  formatDecimal(value: number){
    return value.toLocaleString('vi-VN');
  }

  //
  isValidStep1(): boolean {
    const step1Controls = ['soDienThoaiNguoiGui', 'soDienThoaiNguoiNhan'];
    return step1Controls.every(control => this.orderForm.get(control).valid);
  }

  isValidStep2(): boolean {
    const step2Controls = ['diaChiGiaoHang', 'diaChiNhanHang'];
    return step2Controls.every(control => this.orderForm.get(control).valid);
  }

  isValidStep3(): boolean {
    const step3Controls = ['chiTietDonHang'];
    return step3Controls.every(control => this.orderForm.get(control).valid);
  }
  getNextButtonClass() {
    const currentStepIndex = this.config.selected;
    if (currentStepIndex === 0 && this.isValidStep1()) {
      return 'btn btn-fill btn-submit btn-primary';
    }else if(currentStepIndex === 1 && this.isValidStep2()){
      return 'btn btn-fill btn-submit btn-primary';
    }else if(currentStepIndex === 2 && this.isValidStep3()){
      return 'btn btn-fill btn-submit btn-primary';
    }
    return 'btn btn-fill btn-submit btn-secondary';
  }
  stepChanged(args: any) {
    if(args.step.index == 3){
      this.loadStatistical();
    }
    this.config.selected = args.step.index;
  }
  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }
 
  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }
 
  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }
 
  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }
  // search location 
  searchWrapper: OperatorFunction<string, readonly any[]> = (text$: Observable<any>) =>
    text$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.search(term))
  );

  search(term: string): Observable<any[]> {
    if (term.length < 3) {
      return of([]);
    } else {
      return this.mapService.getLocation(term).pipe(
        map(response => {
          return response.map(m => ({
            name: m.name,
            display_name: m.display_name,
            lon: m.lon,
            lat: m.lat
          }));
        }),
        catchError(error => {
          this.toastr.error('Tìm kiếm địa chỉ không thành công','Thông báo'); 
          console.error(error);
          return of([]);
        })
      );
    }
  }

  // submit
  onSubmit() {
    if (this.orderForm.valid) {
      let formData = this.orderForm.value;
      let payload = {
        diaChiNhanHang: formData.diaChiNhanHang?.display_name,
        diaChiGiaoHang: formData.diaChiGiaoHang?.display_name,
        soDienThoaiNguoiNhan: formData.soDienThoaiNguoiNhan,
        soDienThoaiNguoiGui: formData.soDienThoaiNguoiGui,
        chiTietDonHang: formData.chiTietDonHang,
        khoangCach: this.summary.distance
      }
      this.customerService.order(payload).subscribe(
        response => {
          this.toastr.success('Tạo đơn hàng thành công','Thông báo'); 
          this.router.navigate(['/public/home']);
        },
        error => {
          this.toastr.error('Tạo đơn hàng không thành công','Thông báo');
          console.error('There was an error!', error);
        }
      );
    } else {
      this.toastr.error('Thông tin đơn hàng không hợp lệ!','Thông báo');
    }
  }


 
}
