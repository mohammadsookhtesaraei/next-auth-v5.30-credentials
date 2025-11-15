import { Schema,model,models,Document } from "mongoose";


interface SchemaType extends Document {
    email: string;
    password: string;
    role: string;
    createdAt: Date;
};


const userSchema = new Schema<SchemaType>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        default: "USER"
    },

    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    }
});

const User = models?.User || model<SchemaType>("User", userSchema);


export default User;