import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowLeftIcon, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

export function MembersList() {
    const workspaceId = useWorkspaceId();

    const members = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
        },
        {
            id: 2,
            name: "Jane Doe",
            email: "jane.doe@example.com",
        },
    ];

    return (
        <Card className="w-full h-full shadow-none border-none">
            <CardHeader>
                <Button size="lg" variant="outline" className="w-full">
                    <Link href={`/workspaces/${workspaceId}`}><ArrowLeftIcon/>Back</Link>
                </Button>
                <CardTitle>Members</CardTitle>
            </CardHeader>

            <CardContent>
               
                 {members.map((member, index) => (
                    <>
                    <div key={member.id} className="flex items-center justify-between gap-4">
                    <div className="">
                        {/* <Avatara/> */}
                        <p>{member.name}</p>
                        <p>{member.email}</p>
                        
                    </div>

                    <Button variant="secondary" size="icon"><MoreHorizontalIcon/></Button>
                    </div>

                    {index < members.length - 1 && <Separator />}
                    </>
                ))}
            </CardContent>
        </Card>
    );
}

// TODO: on click of more horizontal icon, show a dropdown with options to "Set as Administrator", "Set as Member",
// "Remove {member.name}"