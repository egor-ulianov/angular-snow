import { Component, OnInit } from '@angular/core';
import { FaceDetectorViewModel } from 'src/app/shared/view-models/face-detector.view-model';

@Component({
  selector: 'app-face-detector',
  templateUrl: './face-detector.component.html',
  styleUrls: ['./face-detector.component.css']
})
export class FaceDetectorComponent implements OnInit
{
  //#region Properties

  public viewModel: FaceDetectorViewModel;
  public video: HTMLVideoElement | null;
  public devicesList: MediaDeviceInfo[] | null;

  //#endregion Properties

  //#region Constrcutors

  constructor()
  {
    this.viewModel = new FaceDetectorViewModel();
    this.video = null;
    this.devicesList = null;
  }
  
  //#endregion Constructors

  //#region Angular lifecycle

  public async ngOnInit(): Promise<void>
  {
     this.video = document.getElementById('webcam') as HTMLVideoElement;
     await this.startWebCam();
  }

  //#endregion Angular lifecycle

  //#region Getters and Setters

  public get cameraWidth(): number
  {
    return window.innerWidth;
  }

  public get cameraHeight(): number
  {
    return window.innerHeight;
  }

  //#endregion Getters and Setters

  //#region Public methods

  public async startWebCam(): Promise<void>
  {
    this.devicesList = await navigator.mediaDevices.enumerateDevices();

    navigator.mediaDevices.getUserMedia(
      {
        video : {facingMode: 'user'}, 
        audio: false
      })
      .then((stream) => 
      {
        if (this.video)
          this.video.srcObject = stream;
      })
      .catch(error =>
        {
          console.log('No camera');
        })
  }

  //#endregion Public methods
}
