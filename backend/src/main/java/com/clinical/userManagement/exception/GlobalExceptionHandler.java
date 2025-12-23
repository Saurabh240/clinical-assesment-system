package com.clinical.userManagement.exception;

import com.clinical.userManagement.dto.ErrorResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponseDTO> handleRuntime(RuntimeException ex, HttpServletRequest request){

        ErrorResponseDTO err=new ErrorResponseDTO(
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                ex.getMessage()
        );

        return new ResponseEntity<>(err,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidJwtTokenException.class)
    public ResponseEntity<ErrorResponseDTO> handleInvalidJwtToken(InvalidJwtTokenException ex, HttpServletRequest request){

        ErrorResponseDTO err=new ErrorResponseDTO(
                HttpStatus.UNAUTHORIZED.getReasonPhrase(),
                ex.getMessage()
        );

        return new ResponseEntity<>(err,HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleUsernameNotFound(UsernameNotFoundException ex, HttpServletRequest request){

        ErrorResponseDTO err=new ErrorResponseDTO(
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage()
        );

        return new ResponseEntity<>(err,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleGeneralException(RuntimeException ex, HttpServletRequest request){

        ErrorResponseDTO err=new ErrorResponseDTO(
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                ex.getMessage()
        );

        return new ResponseEntity<>(err,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
