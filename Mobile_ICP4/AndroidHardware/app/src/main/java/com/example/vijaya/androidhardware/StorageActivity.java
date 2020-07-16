package com.example.vijaya.androidhardware;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;

public class StorageActivity extends AppCompatActivity {
    EditText txt_content;
    EditText contenttoDisplay;
    File actualFile;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        actualFile = new File(getApplicationContext().getFilesDir(), "storageFile.txt");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_storage);
        txt_content = (EditText) findViewById(R.id.id_txt_mycontent);
        contenttoDisplay = (EditText) findViewById(R.id.id_txt_display);
    }
    // saving the text to a file
    public void saveTofile(View v) throws IOException {

        // ICP Task4: Write the code to save the text
        // saving the text to a file
        FileOutputStream fileOutputStream = new FileOutputStream(actualFile);
        fileOutputStream.write(txt_content.getText().toString().getBytes());
        fileOutputStream.close();
    }
    // reading the text from the file
    public void retrieveFromFile(View v) throws IOException {

        // ICP Task4: Write the code to display the above saved text
        //https://examples.javacodegeeks.com/core-java/io/fileinputstream/read-file-in-byte-array-with-fileinputstream/

        byte[] arrayOfBytes = new byte[(int)actualFile.length()];
        FileInputStream fileInputStream = new FileInputStream(actualFile);
        fileInputStream.read(arrayOfBytes);
        fileInputStream.close();
        txt_content.setText(new String(arrayOfBytes));
    }
}
