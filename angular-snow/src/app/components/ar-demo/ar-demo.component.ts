import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as WebARToolkit from '@ar-js-org/artoolkit5-js';
import { ArDemoViewModel } from 'src/app/shared/view-models/ar-demo.view-model';

@Component({
  selector: 'app-ar-demo',
  templateUrl: './ar-demo.component.html',
  styleUrls: ['./ar-demo.component.css']
})
export class ArDemoComponent implements OnInit
{
  //#region Properties

  public viewModel: ArDemoViewModel;

  @ViewChild('video',{ static: true })
  public video: ElementRef<HTMLVideoElement> | null;

  @ViewChild('canvasElement',{ static: true })
  public canvasRef: ElementRef<HTMLCanvasElement> | null;

  public devicesList: MediaDeviceInfo[] | null;
  public videoInput: any;

  //#endregion Properties


  //#region Data members

  private arController: WebARToolkit.default.ARController | undefined;

  //#endregion Data members
  
  //#region  Constructors

  constructor()
  {
    this.canvasRef = null;
    this.video = null;

    this.viewModel = new ArDemoViewModel();
    this.devicesList = null;
  }

  //#endregion Constructors

  //#region Getters and Setters

  public get cameraWidth(): number
  {
    return this.viewModel.cameraWidth;
  }
  
  public get cameraHeight(): number
  {
    return this.viewModel.cameraHeight;
  }
  
  public get isVertical(): boolean
  {
    return window.innerHeight > window.innerWidth;
  }
  
  //#endregion Getters and Setters
  
  //#region Angular lifecycle

  public async ngOnInit(): Promise<void>
  {
    await this.startWebCam();
    await this.initARController();
    this.addMarker();
    this.trackMarker();
  }

  //#endregion Angular lifecycle

  //#region Private methods

  private async startWebCam(): Promise<void>
  {
    this.devicesList = await navigator.mediaDevices.enumerateDevices();

    if (this.video)
      this.videoInput = this.video.nativeElement;

    await navigator.mediaDevices.getUserMedia(
      { 
        video: {facingMode: 'user'}, 
        audio: false 
      })
      .then((stream) => 
      {
        this.videoInput.srcObject = stream;
        let {width, height} = stream.getTracks()[0].getSettings();
        this.viewModel.cameraWidth = width ?? 1;
        this.viewModel.cameraHeight = height ?? 1;
      })
      .catch(
        (err) => 
        console.log(err)
      );
      
    this.viewModel.isCameraLoaded = true;
  }

  private async initARController(): Promise<void>
  {
    if (!this.video)
      return;

    await WebARToolkit.default.ARController
      .initWithDimensions(this.viewModel.cameraWidth, this.viewModel.cameraHeight, 'assets/camera-params/camera_para.dat')
      .then(result =>
        {
          this.arController = result;
        })
  }

  private addMarker(): void
  {
    this.arController?.trackBarcodeMarkerId(1, 100);
    this.arController?.trackBarcodeMarkerId(2, 100);
  }

  private async trackMarker(): Promise<void>
  {
    this.canvasRef?.nativeElement.setAttribute('width', this.viewModel.cameraWidth.toString());
    this.canvasRef?.nativeElement.setAttribute('height', this.viewModel.cameraHeight.toString());

    let context: CanvasRenderingContext2D | undefined | null 
      = this.canvasRef?.nativeElement.getContext('2d');

    setInterval(() =>
    {
      context?.clearRect(0, 0, this.canvasRef?.nativeElement.width ?? 0, this.canvasRef?.nativeElement.height ?? 0);
      //this.arController?.setThreshold(255);

      let result: number | undefined = 0;
      if (this.video?.nativeElement)
         result = this.arController?.detectMarker(this.video?.nativeElement);

      if (result !== 0)
      {
        console.log('Something went wrong in detection!');
        return;
      }
      
      let numOfMarkers: number | undefined = this.arController?.getMarkerNum();

      if (!numOfMarkers)
      {
        console.log('No markers provided');
        return;
      }

      for (let i = 0; i < numOfMarkers; i++)
      {
        let markerData: object | undefined = this.arController?.getMarker(i);

        context?.beginPath();
        if (context)
        {
          context.font = "15px Chakra Petch";
          context.fillStyle = "red";
        }

        let coordinates: number[] = markerData ? markerData['pos' as keyof typeof markerData] : [0, 0];
        let barIdPatt: number = markerData ? markerData['idPatt' as keyof typeof markerData] : -1;
        let barId: number = markerData ? markerData['id' as keyof typeof markerData] : -1;

        context?.fillText('potential marker barId' + barId + 'barIdPatt ' + barIdPatt , coordinates[0], coordinates[1]);
        context?.stroke();
        context?.closePath();
      }

      
    }, 1000 / 60);
  }

  //#endregion Private methods
}
