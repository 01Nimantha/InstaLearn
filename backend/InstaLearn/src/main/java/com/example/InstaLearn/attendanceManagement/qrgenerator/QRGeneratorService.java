package com.example.InstaLearn.attendanceManagement.qrgenerator;

import com.google.zxing.WriterException;

import java.io.IOException;

public interface QRGeneratorService {

    public byte[] generateQRCode(String text, int width, int height) throws WriterException, IOException;
}
