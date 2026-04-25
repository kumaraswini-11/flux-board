"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface JoinWorkspaceFormProps {
    initialValues: {
    name: string;
    image: string | File | null;
}
}

export function JoinWorkspaceForm({initialValues}: JoinWorkspaceFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>
                <CardDescription>you've been invited to join <strong>{initialValues.name}</strong> workspace.</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button size="lg" variant="secondary" type="button" asChild className="w-full lg:w-fit">
                    <Link href="/">Cancel</Link></Button>
                <Button size="lg" type="button" asChild className="w-full lg:w-fit">Join Workspace</Button>
            </CardFooter>
        </Card>
    );
}