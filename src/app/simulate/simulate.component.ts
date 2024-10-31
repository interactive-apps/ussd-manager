import { AfterViewInit, Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UssdService } from "../shared/services/ussd.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-simulate",
  templateUrl: "./simulate.component.html",
  styleUrls: ["./simulate.component.css"]
})
export class SimulateComponent implements OnInit, AfterViewInit {
  isStart: boolean = true;
  phone = null;
  phoneFormatError = "";
  url = "https://etl.dhis2.udsm.ac.tz";
  sessionId = "";
  id;
  need_input = false;
  sending_response = false;
  response_failed = false;
  response_ready = false;
  response_body = "";
  answer = "";
  isImageLoaded = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private ussdService: UssdService
  ) {}

  ngOnInit() {
    this.isStart = true;
    this.id = this.route.snapshot.paramMap.get("id");
  }

  ngAfterViewInit() {}

  onImageLoad() {
    this.isImageLoaded = true;
  }

  cancelRequest() {
    this.isStart = true;
    this.http.get(this.getUrl("*152*05*01", "UC")).subscribe(data => {
      this.response_body = "";
      this.response_ready = false;
      this.sending_response = false;
      this.phone = null;
    });
  }

  sendRequest() {
    this.sending_response = true;
    this.response_ready = false;
    this.http
      .get(this.getUrl(this.answer, "UR"), { responseType: "text" })
      .subscribe(data => {
        try {
          let d = JSON.parse(data);
          if (d.response_type === 2) {
            this.need_input = true;
          }

          if (d.options) {
            this.response_body = "";
            console.log("data", d);
            this.response_body += `${d.text}.<p>`;
            Object.keys(d.options).forEach(key => {
              this.response_body += `${key} ${d.options[key]}<br/>`;
            });
            this.response_body += "</p>";
            console.log(this.response_body);
          } else {
            this.response_body = d.text.replace(
              new RegExp("\n", "g"),
              "<br />"
            );
          }
        } catch (e) {
          const dataArr = data.split(";");
          if (dataArr[0] === "P") {
            this.need_input = true;
          }
          this.response_body = dataArr[2].replace(
            new RegExp("\n", "g"),
            "<br />"
          );
        }
        this.sending_response = false;
        this.response_ready = true;
        this.answer = "";
      });
  }

  sendFirstRequest() {
    if (/^\d+$/.test(this.phone) && this.phone.length == 12) {
      this.phoneFormatError = "";
      this.sending_response = true;
      this.response_ready = false;
      this.sessionId = this.ussdService.make_session_id();
      console.log("URL:", this.getUrl("*152*05*01", "NR"));
      this.http
        .get(this.getUrl("*152*05*01", "NR"), { responseType: "text" })
        .subscribe(
          (data: any) => {
            this.isStart = false;
            console.log("data response data.....", data);
            console.log(data, typeof data);
            try {
              let d = JSON.parse(data);
              if (d.response_type === 2) {
                this.need_input = true;
              }
              console.log("Body:", d);
              this.response_body = d.text;
              if (d.options) {
                this.response_body += "<p>";
                console.log("Object.keys(d.options)", Object.keys(d.options));
                Object.keys(d.options).forEach(key => {
                  this.response_body += `${key} ${d.options[key]}<br/>`;
                });
                this.response_body += "</p>";
                console.log(this.response_body);
              }
            } catch (e) {
              const dataArr = data.split(";");
              if (dataArr[0] === "P") {
                this.need_input = true;
              }
              this.response_body = dataArr[2];
            }
            this.sending_response = false;
            this.response_ready = true;
            this.answer = "";
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.phoneFormatError =
        "Namba uliyoweka siyo sahihi, tafadhali andika katika mfumu ufuatao: 255713000000";
    }
  }

  getUrl(request, type) {
    return `${this.url}/${this.id}?msisdn=${this.phone}&sessionid=${this.sessionId}&input=${request}&USSDType=${type}`;
  }
}