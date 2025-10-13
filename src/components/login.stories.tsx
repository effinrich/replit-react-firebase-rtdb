import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Login } from './login';

const meta = {
  title: 'Pages/Login',
  component: Login,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify page renders correctly', async () => {
      await expect(canvas.getByRole('heading', { name: /user dashboard/i })).toBeInTheDocument();
      await expect(canvas.getByText(/sign in to manage your users/i)).toBeInTheDocument();
    });

    await step('Verify sign-in button is visible', async () => {
      const signInButton = canvas.getByRole('button', { name: /sign in with google/i });
      await expect(signInButton).toBeInTheDocument();
      await expect(signInButton).toBeVisible();
    });
  },
};

export const Accessibility: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify heading hierarchy', async () => {
      const heading = canvas.getByRole('heading', { name: /user dashboard/i });
      await expect(heading).toBeInTheDocument();
    });

    await step('Verify button has accessible name', async () => {
      const button = canvas.getByRole('button', { name: /sign in with google/i });
      await expect(button).toHaveAccessibleName();
    });
  },
};
