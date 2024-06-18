package com.forestier.backend.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    private String author;
    private String message;
    private String date;
}
