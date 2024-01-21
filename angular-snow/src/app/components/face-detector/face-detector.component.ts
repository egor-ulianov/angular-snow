import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FaceDetectorViewModel } from 'src/app/shared/view-models/face-detector.view-model';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import { MediaPipeFaceMeshModelConfig } from '@tensorflow-models/face-landmarks-detection/dist/mediapipe/types';
import { Face, Keypoint } from '@tensorflow-models/face-landmarks-detection';
import { TriangulationHelper } from 'src/app/shared/helpers/triangulation.helper';

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
  public video: ElementRef<HTMLVideoElement> | null;

  @ViewChild('canvasElement',{ static: true })
  public canvasRef: ElementRef<HTMLCanvasElement> | null;

  public stream: any;
  public detection: any;
  public resizedDetections: any;
  public canvas: any;
  public canvasEl: any;
  public displaySize: any;
  public videoInput: any;


  public detectorModel: any;
  public detectorConfig: MediaPipeFaceMeshModelConfig | undefined;
  public detector: facemesh.FaceLandmarksDetector | undefined;

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
     await this.startWebCam();
     await this.runFacemesh();
     this.startDetectFaces();
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

  //#region Public methods

  //#endregion Public methods

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

  private async runFacemesh(): Promise<void>
  {
    this.detectorModel = facemesh.SupportedModels.MediaPipeFaceMesh;

    this.detectorConfig = 
    {
      runtime: "tfjs",
      refineLandmarks: true
    }

    await facemesh.createDetector(this.detectorModel, this.detectorConfig)
      .then(result =>
        {
          this.detector = result;
        })
  }

  private async startDetectFaces(): Promise<void>
  {
    this.canvasRef?.nativeElement.setAttribute('width', this.viewModel.cameraWidth.toString());
    this.canvasRef?.nativeElement.setAttribute('height', this.viewModel.cameraHeight.toString());
    let context: CanvasRenderingContext2D | undefined | null 
      = this.canvasRef?.nativeElement.getContext('2d');
    
    setInterval(async () => 
      {
        context ? this.detectFaces(context) : '';
      }, 150);
  }

  private async detectFaces(context: CanvasRenderingContext2D): Promise<void>
  {
    context.clearRect(0, 0, this.canvasRef?.nativeElement.width ?? 0, this.canvasRef?.nativeElement.height ?? 0);
    let faces: Face[] = [];

    if (this.video?.nativeElement)
      await this.detector?.estimateFaces(this.video?.nativeElement)
        .then(result =>
          {
            faces = result;
          });

    faces.forEach(face =>
      {
        for (let i = 0; i < TriangulationHelper.TriangulationTable.length / 3; i++)
        {
          let points = [
            TriangulationHelper.TriangulationTable[i * 3],
            TriangulationHelper.TriangulationTable[i * 3 + 1],
            TriangulationHelper.TriangulationTable[i * 3 + 2],
          ].map((index) => face.keypoints[index]);
          
          this.drawPath(context, points, true);
        }

        face.keypoints.forEach(keypoint =>
          {
            context.beginPath();
            context.arc(keypoint.x, keypoint.y, 1, 0, 3* Math.PI);
            context.fillStyle = "aqua";
            context.fill();
          })
      });

    
  }

  private drawPath(context: CanvasRenderingContext2D, points: Keypoint[], closePath: boolean): void
  {
    let region = new Path2D();

    region.moveTo(points[0].x, points[0].y);
    points.forEach(point =>
      {
        region.lineTo(point.x, point.y);
      });

      if (closePath)
        region.closePath();

      context.strokeStyle = "teal";
      context.stroke(region);
  }

  //#endregion Private methods
}
