"use client";
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { UploadImage } from "@/components/UploadImage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';


const NEXT_PUBLIC_RECEIVER_WALLET_ADDRESS = process.env.NEXT_PUBLIC_RECEIVER_WALLET_ADDRESS as string;
if (!NEXT_PUBLIC_RECEIVER_WALLET_ADDRESS) {
    throw new Error("NEXT_PUBLIC_RECEIVER_WALLET_ADDRESS is not defined in .env");
}
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;
if (!NEXT_PUBLIC_BACKEND_URL) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined in .env");
}

export const Upload = () => {
    const [images, setImages] = useState<string[]>([]);
    const [title, setTitle] = useState("");
    const [txSignature, setTxSignature] = useState("");
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const router = useRouter();

    async function onSubmit() {
        const response = await axios.post(`${NEXT_PUBLIC_BACKEND_URL}/v1/user/task`, {
            options: images.map(image => ({
                imageUrl: image,
            })),
            title,
            signature: txSignature
        }, {
            headers: {
                "Authorization": localStorage.getItem("token") || "",
                "Content-Type": "application/json",
            }
        });

        router.push(`/task/${response.data.id}`);
    }

    async function makePayment() {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey!,
                toPubkey: new PublicKey(NEXT_PUBLIC_RECEIVER_WALLET_ADDRESS),
                lamports: 100000000, // 0.1 SOL
            })
        );

        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = publicKey!;
        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, 'finalized');
        setTxSignature(signature);
    }

    return <div className="flex justify-center">
        <div className="max-w-screen-lg w-full">
            <div className="text-2xl text-left pt-20 w-full pl-4">
                Create a task
            </div>

            <label className="pl-4 block mt-2 text-md font-medium text-gray-900 text-black">Task details</label>

            <input onChange={(e) => {
                setTitle(e.target.value);
            }} type="text" id="first_name" className="ml-4 mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="What is your task?" required />

            <label className="pl-4 block mt-8 text-md font-medium text-gray-900 text-black">Add Images</label>
            <div className="flex justify-center pt-4 max-w-screen-lg">
                {images.map(image => <UploadImage key={image} image={image} onImageAdded={(imageUrl) => {
                    setImages(i => [...i, imageUrl]);
                }} />)}
            </div>

            <div className="ml-4 pt-2 flex justify-center">
                <UploadImage onImageAdded={(imageUrl) => {
                    setImages(i => [...i, imageUrl]);
                }} />
            </div>

            <div className="flex justify-center">
                <button onClick={txSignature ? onSubmit : makePayment} type="button" className="mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    {txSignature ? "Submit Task" : "Pay 0.1 SOL"}
                </button>
            </div>

        </div>
    </div>
}
