package com.forestier.backend.helper;

import org.modelmapper.ModelMapper;
import org.modelmapper.record.RecordModule;

public class ModelMapperHelper {
    public static final ModelMapper INSTANCE;

    static {
        INSTANCE = new ModelMapper();
        INSTANCE.getConfiguration()
                .setSkipNullEnabled(true);
        INSTANCE.registerModule(new RecordModule());

    }
}
