import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { UserTable } from './user-table';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../../providers/auth-provider';

const meta = {
  title: 'Components/UserTable',
  component: UserTable,
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
} satisfies Meta<typeof UserTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SearchInteraction: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Wait for potential search input', async () => {
      const searchInputs = canvas.queryAllByPlaceholderText(/search/i);
      if (searchInputs.length > 0) {
        await userEvent.type(searchInputs[0], 'John');
        await expect(searchInputs[0]).toHaveValue('John');
      }
    });
  },
};

export const Accessibility: Story = {};
