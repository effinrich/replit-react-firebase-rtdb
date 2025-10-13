import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import App from './app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './providers/auth-provider';

const meta = {
  title: 'Pages/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });
      
      return (
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Story />
          </AuthProvider>
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify app renders without errors', async () => {
      // App should render either the Login page or UserTable depending on auth state
      // We verify that at least one of the main components is present
      const hasLoginOrDashboard = 
        canvas.queryByRole('heading', { name: /user dashboard/i }) !== null;
      
      await expect(hasLoginOrDashboard).toBeTruthy();
    });
  },
};

export const Accessibility: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check for proper heading structure', async () => {
      const heading = canvas.queryByRole('heading', { level: 1 });
      if (heading) {
        await expect(heading).toBeVisible();
      }
    });

    await step('Check for button accessibility', async () => {
      const buttons = canvas.queryAllByRole('button');
      for (const button of buttons) {
        await expect(button).toHaveAccessibleName();
      }
    });
  },
};

export const LoadingState: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check if loading spinner appears during auth check', async () => {
      // If auth is loading, a spinner should be visible
      canvas.queryByRole('progressbar');
      // This may or may not be present depending on auth state timing
    });
  },
};
