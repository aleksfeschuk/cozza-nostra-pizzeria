import { supabase } from './supabase';


const VISITOR_KEY = 'cn_visitor_id'

function getVisitorId(): string {
    let id = localStorage.getItem(VISITOR_KEY)
    if (!id) {
        id = crypto.randomUUID()
        localStorage.setItem(VISITOR_KEY, id)
    }
    return id 
}

export type AnalyticsEvent = 
    | {type: 'page_view'; path: string}
    | {type: 'cta_click'; label: string}
    | {type: 'menu_scroll'; direction: 'left' | 'right'}
    | {type: 'pizza_view'; name: string}
    | {type: 'cart_add'; name: string}
    | {type: 'cart_remove'; name: string}
    | {type: 'order_placed'; label: string}

export function track(event: AnalyticsEvent) {
    if (!supabase) return

    const row = {
        type: event.type,
        path: 'path' in event ? event.path : null,
        label: 'label' in event ? event.label : null,
        direction: 'direction' in event ? event.direction : null,
        name: 'name' in event ? event.name : null,
        visitor_id: getVisitorId()
    }

    supabase
        .from('events')
        .insert(row)
        .then(({ error }) => {
            if (error) console.warn('[analytics] failed to record event:', error.message)
        })
}

export function trackPageView(path: string) {
    track({ type: 'page_view', path })
}
