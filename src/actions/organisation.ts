"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function createOrganization(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name");
    const logo = formData.get("logo");

    const session = await auth();

    if (!session) {
      throw new Error("Unauthorized");
    }

    const organization = await prisma.organization.create({
      data: {
        name: name as string,
        ownerId: session.user?.id as string,
        //   description: description as string | "",
        //   logo: logo as string | "",
        // Create a membership for the creator automatically
        memberships: {
          create: {
            userId: session.user?.id as string,
            role: "OWNER",
          },
        },
      },
    });
    return {
      organization,
      message: "Organization created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      organization: null,
      error: "Failed to create organization",
    };
  }
}

export async function getUserOrganizations() {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Unauthorized");
    }

    const organizations = await prisma.organization.findMany({
      where: {
        memberships: { some: { userId: session.user?.id as string } },
      },
    });

    return organizations;
  } catch (error) {
    console.error(error);
    return [];
  }
}