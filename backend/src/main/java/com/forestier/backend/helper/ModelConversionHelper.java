package com.forestier.backend.helper;

import com.forestier.backend.config.MapperConfig;
import com.forestier.backend.dto.CollaboratorDto;
import com.forestier.backend.dto.ProjectDto;
import com.forestier.backend.dto.UserDto;
import com.forestier.backend.models.Collaborator;
import com.forestier.backend.models.Project;
import com.forestier.backend.models.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModelConversionHelper {

    @Autowired
    private ModelMapper modelMapper;

    public Project toProject(ProjectDto dto) {
        return modelMapper.map(dto, Project.class);
    }

    public ProjectDto toProjectDto(Project project) {
        return modelMapper.map(project, ProjectDto.class);
    }

    public CollaboratorDto toCollaboratorDto(Collaborator collaborator) {
        return modelMapper.map(collaborator, CollaboratorDto.class);
    }

    public Collaborator toCollaborator(CollaboratorDto dto){
        return modelMapper.map(dto, Collaborator.class);
    }

    public UserDto toUserDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }
}
