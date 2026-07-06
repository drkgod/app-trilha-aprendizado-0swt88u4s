import pb from '@/lib/pocketbase/client'

export interface ActivityLog {
  id: string
  user_id: string
  trail_id: string
  topic_id: string
  start_time: string
  end_time: string | null
  total_duration_seconds: number
  active_duration_seconds: number
  visibility_switches: number
  is_completed: boolean
  created: string
  updated: string
}

export const createActivityLog = (data: Partial<ActivityLog>) =>
  pb.collection('activity_logs').create<ActivityLog>(data)

export const updateActivityLog = (id: string, data: Partial<ActivityLog>) =>
  pb.collection('activity_logs').update<ActivityLog>(id, data)

export const getAllActivityLogs = () =>
  pb.collection('activity_logs').getFullList<ActivityLog>({ sort: '-start_time' })

export const getActivityLogsByUser = (userId: string) =>
  pb.collection('activity_logs').getFullList<ActivityLog>({
    filter: pb.filter('user_id = {:uid}', { uid: userId }),
    sort: '-start_time',
  })
