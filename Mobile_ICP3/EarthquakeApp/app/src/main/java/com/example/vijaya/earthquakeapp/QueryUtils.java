package com.example.vijaya.earthquakeapp;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

public class QueryUtils {
    /**
     * Tag for the log messages
     */
    private static final String LOG_TAG = QueryUtils.class.getSimpleName();

    /**
     * Create a private constructor because no one should ever create a {@link QueryUtils} object.
     * This class is only meant to hold static variables and methods, which can be accessed
     * directly from the class name QueryUtils (and an object instance of QueryUtils is not needed).
     */
    private QueryUtils() {
    }

    /**
     * Query the USGS dataset and return a list of {@link Earthquake} objects.
     */
    public static List<Earthquake> fetchEarthquakeData2(String requestUrl) {
        //list of all earthquakes objects
        List<Earthquake> eqs = new ArrayList<>();
        try {
            //TODO: 1. Create a URL from the requestUrl string and make a GET request to it
            //TODO: 2. Read from the Url Connection and store it as a string(jsonResponse)
                /*TODO: 3. Parse the jsonResponse string obtained in step 2 above into JSONObject to extract the values of
                        "mag","place","time","url"for every earth quake and create corresponding Earthquake objects with them
                        Add each earthquake object to the list(earthquakes) and return it.
                */
            //url object that takes url of the requested
            URL url = new URL(requestUrl);
            //open the connection
            URLConnection conn = url.openConnection();
            //get the input stream from connection
            InputStream inStream = conn.getInputStream();
            //use reader to get the input stream
            InputStreamReader inStreamReader = new InputStreamReader(inStream);
            //use buffered reader so I can get strings
            BufferedReader buffReader = new BufferedReader(inStreamReader);
            //string to store each line
            String jsonLine;
            //string builder
            StringBuilder sb = new StringBuilder(0);
            //get all the lines and append them to a string builder
            while ((jsonLine = buffReader.readLine()) !=  null) {
                sb.append(jsonLine);
            }
            //close buffered reader
            buffReader.close();
            //get the json string from stringbuilder
            String json = sb.toString();
            //get the json object from string
            JSONObject object = new JSONObject(json);
            //get the array of all features
            JSONArray array = (JSONArray) object.get("features");

            for(int i =0;i < array.length(); i++){
                //get the properties of each feature
                JSONObject objectProperties = array.getJSONObject(i).getJSONObject("properties");
                double magnitude;
                //check if the magnitude int or double
                if(objectProperties.get("mag") instanceof Integer){
                     magnitude= (int)objectProperties.get("mag");
                }
                else{
                 magnitude= (double)objectProperties.get("mag");
                }
                //create the earthquake object
                Earthquake eq = new Earthquake(magnitude,
                        (String) objectProperties.get("place"), (long)objectProperties.get("time"), (String) objectProperties.get("url"));
                //add the earthquake to the list
                eqs.add(eq);
            }
        } catch (Exception e) {
            Log.e(LOG_TAG, "Exception:  ", e);
        }
        // Return the list of earthquakes
        return eqs;
    }
}
