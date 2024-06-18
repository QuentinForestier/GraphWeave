package com.forestier.backend.models.uml;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public enum Visibility
{
    PUBLIC("public",'+'),
    PACKAGE("package",'~'),
    PROTECTED("protected",'#'),
    PRIVATE("private",'-');

    @JsonIgnore
    private char symbol;

    private String name;

    Visibility(String name, char symbol){
        this.name = name;
        this.symbol = symbol;
    }


}