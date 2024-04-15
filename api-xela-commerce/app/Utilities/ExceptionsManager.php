<?php

namespace App\Utilities;

use Illuminate\Validation\ValidationException;

use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class ExceptionsManager
{
    
    public static function respondException(\Exception $exception) {
        $errorData = self::classifyException($exception);
        $res = [
            'message'   => 'Something went wrong when processing the request.',
            'reason'    =>  $errorData['reason']
        ];
        error_log(get_class($exception));
        error_log($exception->getMessage());
        return response()->json($res, $errorData['code']);
    }

    private static function classifyException(\Exception $exception) {
        if ($exception instanceof ValidationException) {
            return [
                'reason'    => $exception->errors(),
                'code'      => 404
            ];
        } elseif ($exception instanceof AccessDeniedHttpException || $exception instanceof TokenExpiredException) {
            return [
                'reason'    => $exception->getMessage().'.',
                'code'      => 403  
            ];
        } elseif ($exception instanceof UnauthorizedHttpException || $exception instanceof TokenInvalidException) {
            return [
                'reason'    => $exception->getMessage().'.',
                'code'      => 401
            ];
        } elseif ($exception instanceof NotFoundHttpException) {
            return [
                'reason'    => $exception->getMessage().'.',
                'code'      => 404
            ];
        } else {
            return [
                'reason'    => 'Internal server error.',
                'code'      => 500
            ];
        }
    }

}
