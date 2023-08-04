import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiSuccessResponseWithData = (model: any) => {
  return applyDecorators(
    ApiExtraModels(Array.isArray(model) ? model[0] : model),
    ApiOkResponse({
      schema: {
        properties: {
          message: {
            type: 'string',
          },
          success: {
            type: 'boolean',
          },
          data: {
            ...(Array.isArray(model)
              ? {
                  type: 'array',
                  items: {
                    $ref: getSchemaPath(model[0]),
                  },
                }
              : {
                  $ref: getSchemaPath(model),
                }),
          },
        },
        required: ['success'],
      },
    }),
  );
};

export const ApiSuccessResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          success: {
            type: 'boolean',
          },
        },
        required: ['success'],
      },
    }),
  );
};
