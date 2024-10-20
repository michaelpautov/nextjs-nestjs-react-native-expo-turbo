import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      if (typeof value !== "object" || value === null) {
        throw new Error("Invalid input");
      }
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (e: any) {
      if (e.errors) {
        throw new BadRequestException(
          "Validation failed: " +
            e.errors?.map((err: Error) => err.message).join(", "),
        );
      }
      throw new BadRequestException("Validation failed: " + e);
    }
  }
}
