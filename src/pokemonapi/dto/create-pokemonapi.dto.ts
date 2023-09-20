import { IsInt, IsPositive, IsString, Min, MinLength  } from "class-validator";

export class CreatePokemonapiDto {
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number

    @MinLength(1)
    @IsString()
    name: string
}
