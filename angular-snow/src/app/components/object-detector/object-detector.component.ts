import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ObjectDetectorViewModel } from 'src/app/shared/view-models/object-detector.view-model';

import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from "@tensorflow/tfjs"
import { GraphModel } from '@tensorflow/tfjs';

import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { DetectedObject } from '@tensorflow-models/coco-ssd';
import { ColorsHelper } from 'src/app/shared/helpers/colors.helper';
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
  public graphModel: GraphModel | null;

  public model: cocoSsd.ObjectDetection | null;
  public classes: (string | null)[] = [];



  public devicesList: MediaDeviceInfo[] | null;

  @ViewChild('video',{ static: true })
  public video: ElementRef | null;

  @ViewChild('canvasElement',{ static: true })
  public canvasRef: ElementRef<HTMLCanvasElement> | null;

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
    this.model = null;
    this.devicesList = null;
    this.canvasRef = null;
    this.video = null;
    this.graphModel = null;
  }

  //#endregion Constructors

  //#region Angular lifecycle

  public async ngOnInit(): Promise<void>
  {
    await this.loadModel();
    await this.startWebCam();
    this.startDetectThings();
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

  private async loadModel(): Promise<void>
  {
    this.model?.dispose();

    await cocoSsd.load({base: 'lite_mobilenet_v2'})
      .then(result =>
        {
          this.model = result;
          this.startWebCam();
        });
  }

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

  private async startDetectThings(): Promise<void>
  {
    this.canvasRef?.nativeElement.setAttribute('width', this.viewModel.cameraWidth.toString());
    this.canvasRef?.nativeElement.setAttribute('height', this.viewModel.cameraHeight.toString());
    let context: CanvasRenderingContext2D | undefined | null 
      = this.canvasRef?.nativeElement.getContext('2d');
    
    setInterval(async () => 
      {
        context ? this.detectThings(context) : '';
      }, 30);
  }

  private async detectThings(context: CanvasRenderingContext2D): Promise<void>
  {
    console.log(this.canvasRef?.nativeElement.width + ' ' + this.canvasRef?.nativeElement.height);
    this.classes = [];
    context.clearRect(0, 0, this.canvasRef?.nativeElement.width ?? 0, this.canvasRef?.nativeElement.height ?? 0);
    let detectedObjects: DetectedObject[] = [];

    if (this.video?.nativeElement)
      await this.model?.detect(this.video?.nativeElement)
        .then(result =>
          {
            detectedObjects = result;
          });
        
      this.classes = this.classes.concat(detectedObjects.map(dObj => this.classes.includes(dObj.class) ? null : dObj.class).filter(val => val != null));
      detectedObjects.forEach(dObj =>
      {
        context.beginPath();
        context.fillStyle = ColorsHelper.getColorViaIndex(this.classes.indexOf(dObj.class));
        context.lineWidth = 4;
        context.strokeStyle = ColorsHelper.getColorViaIndex(this.classes.indexOf(dObj.class));
        context.roundRect(...dObj.bbox, 5);
        context.font = "25px Chakra Petch";
        context.fillText(dObj.class, dObj.bbox[0] + 30, dObj.bbox[1] + 30);
        context.stroke();
        context.closePath();
      });
  }

  //#endregion Private methods
}
