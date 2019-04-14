#include <HTTPClient.h>

#include <Adafruit_Sensor.h>

#include <WiFi.h>
#include "DHT.h"

#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321

// Replace with your network credentials
const char* ssid     = "iPhone";
const char* password = "mehdi1306";

// DHT Sensor
const int DHTPin = 27;
// Initialize DHT sensor.
DHT dht(DHTPin, DHTTYPE);

// defines pins numbers distance
const int trigPin = 32;
const int echoPin = 35;

 
int inputPin = 2;               // choose the input pin (for PIR sensor)
int pirState = LOW;             // we start, assuming no motion detected
int val = 0;                    // variable for reading the pin status
 

// Temporary variables
static char celsiusTemp[7];
static char fahrenheitTemp[7];
static char humidityTemp[7];
static char distanceMes[7];

// Client variables 
char linebuf[80];
int charcount=0;


long duration;
int distance;

void setup() {
  // initialize the DHT sensor
  dht.begin();
  
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  pinMode(inputPin, INPUT);     // declare sensor as input


  //Initialize serial and wait for port to open:
  Serial.begin(115200);
  while(!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  // attempt to connect to Wifi network:
  while(WiFi.status() != WL_CONNECTED) {
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
}

void loop() {
    // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
    float h = dht.readHumidity();
    // Read temperature as Celsius (the default)
    float t = dht.readTemperature();
    // Read temperature as Fahrenheit (isFahrenheit = true)
    float f = dht.readTemperature(true);
    Serial.println(h);
    Serial.println(t);
    Serial.println(f);
    // Check if any reads failed and exit early (to try again).
    if (isnan(h) || isnan(t) || isnan(f)) {
        Serial.println("Failed to read from DHT sensor!");
        strcpy(celsiusTemp,"Failed");
        strcpy(fahrenheitTemp, "Failed");
        strcpy(humidityTemp, "Failed");         
    }
    else{
        // Computes temperature values in Celsius + Fahrenheit and Humidity
        float hic = dht.computeHeatIndex(t, h, false);       
        //dtostrf(hic, 6, 2, celsiusTemp);
        sprintf(celsiusTemp, "%g", t);         
        float hif = dht.computeHeatIndex(f, h);
        //dtostrf(hif, 6, 2, fahrenheitTemp);         
        //dtostrf(h, 6, 2, humidityTemp);
        sprintf(humidityTemp, "%f", h);
    }
    digitalWrite(trigPin, LOW);
    delay(500);

    // Sets the trigPin on HIGH state for 10 micro seconds
    digitalWrite(trigPin, HIGH);
    delay(500);
    digitalWrite(trigPin, LOW);

    // Reads the echoPin, returns the sound wave travel time in microseconds
    duration = pulseIn(echoPin, HIGH);

    // Calculating the distance
    distance= duration*0.034/2;

    sprintf(distanceMes, "%d", distance);

    val = digitalRead(inputPin);  // read input value

    Serial.println("--------BEFORE STRING-------");
    Serial.println(h);
    Serial.println(t);
    Serial.println(distance);

    Serial.println("--------AFTER STRING-------");
    Serial.println(humidityTemp);
    Serial.println(celsiusTemp);
    Serial.println(distanceMes);

    char body[120];
    strcpy(body, "{\"tempCelsius\":\"");
    strcat(body, celsiusTemp);
    strcat(body, "\",\"humidity\":\"");
    strcat(body, humidityTemp);
    strcat(body, "\",\"distance\":\"");
    strcat(body, distanceMes);
    strcat(body, "\"}");

    Serial.println(body);

    HTTPClient http;   
    
    http.begin("http://185.216.25.195:8088/data");  //Specify destination for HTTP request
    http.addHeader("Content-Type", "application/json");             //Specify content-type header
    
    //String body = String("{\"tempCelsius\":\"" + celsiusTemp + "\",\"tempFahrenheit\":\"" + fahrenheitTemp + "\",\"humidity\":\"" + humidityTemp + "\"}")

    int httpResponseCode = http.POST(body);   //Send the actual POST request

    if(httpResponseCode>0) {
      String response = http.getString();

      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.println("Error in sending data process");  
    }

    // give the web browser time to receive the data
    delay(10000);
}
