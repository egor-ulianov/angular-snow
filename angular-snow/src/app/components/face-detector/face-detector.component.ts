import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FaceDetectorViewModel } from 'src/app/shared/view-models/face-detector.view-model';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-face-detector',
  templateUrl: './face-detector.component.html',
  styleUrls: ['./face-detector.component.css']
})
export class FaceDetectorComponent implements OnInit
{
  //#region Properties

  public viewModel: FaceDetectorViewModel;
  public devicesList: MediaDeviceInfo[] | null;

  @ViewChild('video',{ static: true })
  public video: ElementRef | null;

  @ViewChild('canvas',{ static: true })
  public canvasRef: ElementRef | null;

  public stream: any;
  public detection: any;
  public resizedDetections: any;
  public canvas: any;
  public canvasEl: any;
  public displaySize: any;
  public videoInput: any;

  //#endregion Properties

  //#region Constrcutors

  constructor(private elRef: ElementRef)
  {
    this.viewModel = new FaceDetectorViewModel();
    this.devicesList = null;
    this.canvasRef = null;
    this.video = null;
  }
  
  //#endregion Constructors

  //#region Angular lifecycle

  public async ngOnInit(): Promise<void>
  {
     await this.loadModels();
  }

  //#endregion Angular lifecycle

  //#region Getters and Setters

  public get cameraWidth(): number
  {
    return this.viewModel.cameraWidth - 30;
  }

  public get cameraHeight(): number
  {
    return this.viewModel.cameraHeight - 30;
  }

  //#endregion Getters and Setters

  //#region Public methods

  public async startWebCam(): Promise<void>
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
    this.detectFaces();
  }

  //#endregion Public methods

  //#region Private methods

  private async loadModels(): Promise<void>
  {
    await Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('../../assets/models'),
    await faceapi.nets.faceLandmark68Net.loadFromUri('../../assets/models'),
    await faceapi.nets.faceRecognitionNet.loadFromUri('../../assets/models'),
    await faceapi.nets.faceExpressionNet.loadFromUri('../../assets/models'),]).then(() => this.startWebCam());
  }

  private async detectFaces(): Promise<void> 
  {
    this.elRef.nativeElement.querySelector('video').addEventListener('play', async () => 
      {
        this.canvas = await faceapi.createCanvasFromMedia(this.videoInput);

        if (this.canvasRef)
          this.canvasEl = this.canvasRef.nativeElement;
        this.canvasEl.appendChild(this.canvas);
        this.canvas.setAttribute('id', 'canvass');
        this.canvas.setAttribute(
            'style',`position: relative;
            top: 0;
            left: 0;`
        );
        this.displaySize = {
            width: this.videoInput.width,
            height: this.videoInput.height,
        };
        faceapi.matchDimensions(this.canvas, this.displaySize);
        setInterval(async () => {
          this.detection = await faceapi.detectAllFaces(this.videoInput,  new  faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
          this.resizedDetections = faceapi.resizeResults(
              this.detection,
              this.displaySize
            );
          this.canvas.getContext('2d').clearRect(0, 0,      this.canvas.width,this.canvas.height);
          faceapi.draw.drawDetections(this.canvas, this.resizedDetections);
          faceapi.draw.drawFaceLandmarks(this.canvas, this.resizedDetections);
          faceapi.draw.drawFaceExpressions(this.canvas, this.resizedDetections);
        }, 100);
      });
    }

  //#endregion Private methods
}
