import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ObjectDetectorViewModel } from 'src/app/shared/view-models/object-detector.view-model';

import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from "@tensorflow/tfjs"

//import * as cocoSsd from '@tensorflow-models/coco-ssd';
//import * as faceapi from '@vladmandic/face-api';
//import { DetectedObject } from '@tensorflow-models/coco-ssd';

@Component({
  selector: 'app-object-detector',
  templateUrl: './object-detector.component.html',
  styleUrls: ['./object-detector.component.css']
})
export class ObjectDetectorComponent implements OnInit
{
  //#region Properties

  public viewModel: ObjectDetectorViewModel;

  //public model: cocoSsd.ObjectDetection | null;



  public devicesList: MediaDeviceInfo[] | null;

  @ViewChild('video',{ static: true })
  public video: ElementRef | null;

  @ViewChild('canvas',{ static: true })
  public canvasRef: ElementRef | null;

  public stream: any;
  public detection: any;
  public resizedDetections: any;
  public canvas: any | HTMLCanvasElement;
  public canvasEl: any;
  public displaySize: any;
  public videoInput: any;

  //#endregion Properties

  //#region Constructors

  constructor(private elRef: ElementRef)
  {
    this.viewModel = new ObjectDetectorViewModel();
    //this.model = null;
    this.devicesList = null;
    this.canvasRef = null;
    this.video = null;
  }

  //#endregion Constructors

  //#region Angular lifecycle

  public async ngOnInit(): Promise<void>
  {
    //await this.loadModel();
  }

  //#endregion Angular lifecycle

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

  //#region Private methods

  // private async loadModel(): Promise<void>
  // {
  //   this.model?.dispose();

  //   await cocoSsd.load({base: 'lite_mobilenet_v2'})
  //     .then(result =>
  //       {
  //         this.model = result;
  //         this.startWebCam();
  //       });
  // }

  // private async startWebCam(): Promise<void>
  // {
  //   this.devicesList = await navigator.mediaDevices.enumerateDevices();

  //   if (this.video)
  //     this.videoInput = this.video.nativeElement;

  //   await navigator.mediaDevices.getUserMedia(
  //     { 
  //       video: {facingMode: 'user'}, 
  //       audio: false 
  //     })
  //     .then((stream) => 
  //     {
  //       this.videoInput.srcObject = stream;
  //       let {width, height} = stream.getTracks()[0].getSettings();
  //       this.viewModel.cameraWidth = width ?? 1;
  //       this.viewModel.cameraHeight = height ?? 1;
  //     })
  //     .catch(
  //       (err) => 
  //       console.log(err)
  //     );
      
  //   this.viewModel.isCameraLoaded = true;
  //   this.detectThings();
  // }

  private async detectThings(): Promise<void>
  {
    // this.elRef.nativeElement.querySelector('video').addEventListener('play', async () => 
    //   {
    //     this.canvas = await faceapi.createCanvasFromMedia(this.videoInput);

    //     if (this.canvasRef)
    //       this.canvasEl = this.canvasRef.nativeElement;
    //     this.canvasEl.appendChild(this.canvas);
    //     this.canvas.setAttribute('id', 'canvass');
    //     this.canvas.setAttribute(
    //         'style',`position: relative;
    //         top: 0;
    //         left: 0;`
    //     );
    //     this.displaySize = {
    //         width: document.getElementById('webcam')?.offsetWidth,
    //         height: document.getElementById('webcam')?.offsetHeight
    //     };
    //     faceapi.matchDimensions(this.canvas, this.displaySize);
    //     setInterval(async () => 
    //     {
    //       let camera = await tf.data.webcam(document.getElementById('webcam') as HTMLVideoElement);
    //       let image = await camera.capture();
    //       let result: DetectedObject[] | undefined = await this.model?.detect(image, 40, 0.99);
    //       let context: CanvasRenderingContext2D = this.canvas.getContext('2d');
    //       context.clearRect(0, 0,      this.canvas.width,this.canvas.height);
    //       context.font = '15px Arial';

    //       if (!result)
    //         return;
          
    //       console.log('number of detections: ', result.length);
    //       for (let i = 0; i < result.length; i++) 
    //       {
    //         //context.beginPath();
    //         //if (result[i].bbox[2] == 0 && result[i].bbox[3] == 0)
    //           //continue;
            
    //         //context.clearRect(0, 0,      this.canvas.width,this.canvas.height);
    //         context.rect(...result[i].bbox);
    //         context.lineWidth = 4;
    //         context.strokeStyle = 'green';
    //         context.fillStyle = 'green';
    //         context.stroke();
    //         console.log(result[i].score.toFixed(3) + ' ' + result[i].class + ' (' +
    //         result[i].bbox[0] + ' ' +
    //         result[i].bbox[1] + ' ' +
    //         result[i].bbox[2] + ' ' +
    //         result[i].bbox[3] + ') ');
    //         context.fillText(
    //             result[i].score.toFixed(3) + ' ' + result[i].class + ' (' +
    //             result[i].bbox[0] + ' ' +
    //             result[i].bbox[1] + ' ' +
    //             result[i].bbox[2] + ' ' +
    //             result[i].bbox[3] + ') ', 
    //             result[i].bbox[0],
    //             result[i].bbox[1] > 10 ? result[i].bbox[1] - 5 : 10);
    //       }
    //     }, 500);
    //   });
  }

  //#endregion Private methods
}
