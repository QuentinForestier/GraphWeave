package com.forestier.backend.helper;

import com.forestier.backend.dto.uml.entities.ClassDto;
import com.forestier.backend.dto.uml.entities.EntityDto;
import com.forestier.backend.dto.uml.entities.EnumDto;
import com.forestier.backend.dto.uml.entities.InterfaceDto;
import com.forestier.backend.models.uml.entities.Class;
import com.forestier.backend.models.uml.entities.Entity;
import com.forestier.backend.models.uml.entities.Interface;
import org.modelmapper.ModelMapper;
import org.modelmapper.record.RecordModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

public class EntityConversionHelper {

    private static final HashMap<java.lang.Class<?>, java.lang.Class<?>> conversionMap = new HashMap<>() {
        {
            put(Class.class, ClassDto.class);
            put(Enum.class, EnumDto.class);
            put(Interface.class, InterfaceDto.class);
        }
    };


    public static <T, TDto> T convertToEntity(TDto dto) {

        return (T) ModelMapperHelper.INSTANCE.map(dto, getEntityClass(dto.getClass()));
    }

    public static <T, TDto> TDto convertToEntityDto(T entity) {
        return (TDto) ModelMapperHelper.INSTANCE.map(entity, conversionMap.get(entity.getClass()));
    }

    public static <S, T> T updateEntity(S source, T destination) {
        ModelMapperHelper.INSTANCE.map(source, destination);
        return destination;
    }

    private static <T> java.lang.Class<?> getEntityClass(java.lang.Class<T> entityClass) {
       for(Map.Entry<java.lang.Class<?>, java.lang.Class<?>> entry : conversionMap.entrySet()) {
           if(entry.getValue().equals(entityClass)) {
               return entry.getKey();
           }
       }
       throw new IllegalArgumentException("Invalid entity type");
    }


}
