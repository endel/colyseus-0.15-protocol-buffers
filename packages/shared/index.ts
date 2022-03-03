import { Field, Message, Type } from "protobufjs";

@Type.d("MyProtoMessage")
export class MyProtoMessage extends Message<MyProtoMessage> {
    @Field.d(1, "int32")
    int32!: number;

    @Field.d(2, "bool")
    bool!: boolean;

    @Field.d(3, "string")
    str!: string;
}